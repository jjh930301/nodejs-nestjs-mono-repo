/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  DiscoveryModule,
  DiscoveryService,
  MetadataScanner,
  Reflector,
} from '@nestjs/core';
import { DynamicModule, Logger, Module, OnModuleInit } from '@nestjs/common';
import {
  ApiMeta,
  RES_DATA_METADATA,
  ResDataDto,
  ResDataOptions,
} from './res-data.decorator';
import * as dayjs from 'dayjs';

@Module({
  imports: [
    // Container에 접근하기 위해 DiscoveryModule을 주입합니다.
    DiscoveryModule,
  ],
})

// OnModuleInit Lifecycle event에 사용될 Hook을 만들어줍니다.
export class ResDataModule implements OnModuleInit {
  constructor(
    // DiscoveryModule을 불러와야 DiscoveryService와 MetadataScanner을 주입할 수 있습니다.
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,

    // Reflector는 모든 모듈에서 접근할 수 있는 provider 입니다.
    private readonly reflector: Reflector,
  ) {}

  // 전역 모듈로 등록하기 위한 static method 입니다.
  // 참고링크: https://docs.nestjs.com/modules#dynamic-modules
  static forRoot(): DynamicModule {
    return {
      module: ResDataModule,
      global: true,
    };
  }

  // OnModuleInit event에 이 메소드를 실행합니다.
  onModuleInit() {
    this.getMetadata();
  }

  getMetadata() {
    // getProviders를 통해서 모든 singleton instance를 가져옵니다.
    this.discovery
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        // 모든 Provider instance의 method를 순회합니다.
        this.scanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          this.mapperData(instance),
        );
      });
  }

  // @ts-ignore
  mapperData(instance) {
    const { reflector } = this;

    // @ts-ignore
    return (methodName) => {
      const methodRef = instance[methodName];
      const metadata: ResDataOptions = reflector.get(
        RES_DATA_METADATA,
        methodRef,
      );

      if (!metadata) return;

      let { logger } = metadata;

      if (!logger) logger = new Logger();

      const originMethod = (...args: unknown[]) =>
        methodRef.call(instance, ...args);

      // 3. 메소드에 캐시로직을 끼워넣습니다.
      instance[methodName] = async (...args: unknown[]) => {
        // 먼저 캐시된 데이터를 가져오고

        const data = await originMethod(...args);
        const meta: ApiMeta = {
          paging: null,
          search: [],
          timestamp: null,
        };

        meta.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');

        return new ResDataDto(data, true, null, meta);
      };

      // 이렇게 console을 띄워보면, ZumCache Decorator가 사용된
      // method의 정보와, 해당 Decorator에 넘긴 metadata를 확인할 수 있습니다.
    };
  }
}
