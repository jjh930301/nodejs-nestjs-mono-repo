import { Injectable, Provider } from '@nestjs/common';
import { type Request } from 'express';
import * as xlsx from 'xlsx';

@Injectable()
export class XlsxUtil {
  async createExcelDownloadResponse<T extends unknown[]>(
    data: T,
    fileName: string,
  ) {
    const excelSheet = xlsx.utils.json_to_sheet(data);

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, excelSheet);
    const buffer = xlsx.write(workbook, { type: 'buffer' });

    return {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=${fileName}.xlsx`,
      },
      body: buffer,
    };
  }

  async bufferToListOneSheet(bufferData: unknown) {
    // 01-01-02. Excel 파일 읽기
    const csvData = xlsx.read(bufferData, {
      type: 'buffer',
    });
    // 01-01-03. Excel 파일 json 형태로 변환
    const parsedData = csvData.SheetNames.map((sheetName) => {
      return {
        sheetName,
        data: xlsx.utils.sheet_to_json(csvData.Sheets[sheetName]),
      };
    });
    return parsedData[0];
  }

  async fileTypeValidation(req: Request) {
    const file = req.file;
    const contentType =
      req.headers['Content-Type'] ||
      req.headers['content-type'] ||
      req.headers['CONTENT-TYPE'];

    if (!file) {
      throw new Error('파일이 없습니다.');
    } else {
      if (
        ('length' in file && file.length === 0) ||
        !file.originalname.includes('xlsx') ||
        !(
          contentType &&
          typeof contentType === 'string' &&
          contentType.toUpperCase().includes('MULTIPART')
        )
      ) {
        throw new Error('파일 형식이 맞지 않습니다.');
      }
    }
  }
}

export const XlsxProvier: Provider = {
  provide: XlsxUtil,
  useFactory: () => new XlsxUtil(),
};
