import { Injectable, Provider } from '@nestjs/common';
@Injectable()
export class GenerateTemplateUtil {
  getRegisterTemplate(validKey: string): string {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  lang="en"
  dir="ltr"
  style="
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    -webkit-text-size-adjust: 100%;
  "
>
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <style data-emotion="css-global o6gwfi">
      @media print {
        body {
          background-color: #fff;
        }
      }
    </style>
    <style>
      @media screen and (max-width: 599.95px) {
        .block-mobile {
          display: block !important;
        }

        .block-desktop {
          display: none !important;
        }
      }
    </style>
  </head>

  <body
    style="
      box-sizing: inherit;
      margin: 0;
      color: rgba(0, 0, 0, 0.87);
      font-family: &quot;Roboto&quot;, &quot;Helvetica&quot;, &quot;Arial&quot;,
        sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      background-color: #f2f5f7;
    "
  >
    <div
      class="MuiBox-root css-29x6sm"
      style="
        box-sizing: inherit;
        font-weight: 400;
        font-size: 16px;
        padding: 32px 0;
        margin: 0;
        letter-spacing: 0.15008px;
        line-height: 1.5;
        background-color: #f2f5f7;
        font-family: &quot;Helvetica Neue&quot;, &quot;Arial Nova&quot;,
          &quot;Nimbus Sans&quot;, Arial, sans-serif;
        color: #242424;
      "
    >
      <div
        style="
          box-sizing: inherit;
          display: none;
          overflow: hidden;
          line-height: 1px;
          opacity: 0;
          max-height: 0;
          max-width: 0;
        "
      >
        If you didn&#x27;t request a reset, don&#x27;t worry. You can safely
        ignore this email.
        <div style="box-sizing: inherit"></div>
      </div>
      <table
        align="center"
        width="100%"
        style="
          box-sizing: inherit;
          background-color: #ffffff;
          max-width: 600px;
          min-height: 48px;
        "
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        bgcolor="#FFFFFF"
      >
        <tbody style="box-sizing: inherit">
          <tr style="box-sizing: inherit; width: 100%">
            <td style="box-sizing: inherit">
              <div
                style="
                  padding: 24px 24px 8px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <img
                  src="https://evse.s3.ap-northeast-2.amazonaws.com/crocus_full_logo.png"
                  style="
                    box-sizing: inherit;
                    display: inline-block;
                    outline: none;
                    border: none;
                    text-decoration: none;
                    vertical-align: middle;
                    max-width: 100%;
                    height: 40px;
                  "
                  height="40"
                />
              </div>
              <div
                style="
                  font-family: inherit;
                  font-weight: bold;
                  padding: 32px 24px 0px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <h3
                  style="
                    box-sizing: inherit;
                    margin-top: 40px;
                    margin-bottom: 16px;
                    font-weight: inherit;
                    margin: 0;
                    font-size: 20px;
                  "
                >
                  회원가입
                </h3>
              </div>
              <div
                style="
                  color: #474849;
                  font-family: inherit;
                  font-size: 14px;
                  font-weight: normal;
                  padding: 8px 24px 16px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <div class="MuiBox-root css-vii0ua" style="box-sizing: inherit">
                  <div style="box-sizing: inherit">
                    <p
                      style="
                        box-sizing: inherit;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      "
                    >
                      잘못 수신된 메세지일 경우 무시해주세요.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style="
                  font-family: inherit;
                  font-size: 14px;
                  font-weight: bold;
                  padding: 12px 24px 32px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <a
                  href="${process.env.FRONT_HOST}/register/${validKey}"
                  target="_blank"
                  style="
                    box-sizing: inherit;
                    background-color: #2458af;
                    color: #ffffff;
                    padding: 0px 0px;
                    border-radius: 64px;
                    width: auto;
                    display: inline-block;
                    line-height: 100%;
                    text-decoration: none;
                    max-width: 100%;
                  "
                  ><span style="box-sizing: inherit"
                    ><!--[if mso
                      ]><i
                        style="
                          letter-spacing: undefinedpx;
                          mso-font-width: -100%;
                          mso-text-raise: 0;
                        "
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ><span
                    style="
                      box-sizing: inherit;
                      background-color: #2458af;
                      color: #ffffff;
                      padding: 12px 20px;
                      border-radius: 64px;
                      width: auto;
                      display: inline-block;
                      max-width: 100%;
                      line-height: 120%;
                      text-decoration: none;
                      text-transform: none;
                      mso-padding-alt: 0px;
                      mso-text-raise: 0;
                    "
                    >회원가입 하기</span
                  ><span style="box-sizing: inherit"
                    ><!--[if mso
                      ]><i
                        style="
                          letter-spacing: undefinedpx;
                          mso-font-width: -100%;
                        "
                        hidden
                        >&nbsp;</i
                      ><!
                    [endif]--></span
                  ></a
                >
              </div>
              <!-- <div
                style="
                  padding: 16px 24px 16px 24px;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <hr
                  style="
                    box-sizing: inherit;
                    margin: 0px;
                    width: 100%;
                    border: none;
                    border-top: 1px solid #eaeaea;
                    border-color: rgb(233, 233, 233);
                    border-top-width: 1px;
                  "
                />
              </div>
              <div
                style="
                  color: #474849;
                  font-family: inherit;
                  font-size: 12px;
                  font-weight: normal;
                  padding: 4px 24px 24px 24px;
                  text-align: left;
                  max-width: 100%;
                  box-sizing: border-box;
                "
              >
                <div class="MuiBox-root css-vii0ua" style="box-sizing: inherit">
                  <div style="box-sizing: inherit">
                    <p
                      style="
                        box-sizing: inherit;
                        margin-top: 0px;
                        margin-bottom: 0px;
                      "
                    >
                      Need help? Just reply to this email to contact support.
                    </p>
                  </div>
                </div>
              </div> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
    `;
  }
  getResetPassword(validKey: string) {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      lang="en"
      dir="ltr"
      style="
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
      "
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <style data-emotion="css-global o6gwfi">
          @media print {
            body {
              background-color: #fff;
            }
          }
        </style>
        <style>
          @media screen and (max-width: 599.95px) {
            .block-mobile {
              display: block !important;
            }
    
            .block-desktop {
              display: none !important;
            }
          }
        </style>
      </head>
    
      <body
        style="
          box-sizing: inherit;
          margin: 0;
          color: rgba(0, 0, 0, 0.87);
          font-family: &quot;Roboto&quot;, &quot;Helvetica&quot;, &quot;Arial&quot;,
            sans-serif;
          font-weight: 400;
          font-size: 1rem;
          line-height: 1.5;
          letter-spacing: 0.00938em;
          background-color: #f2f5f7;
        "
      >
        <div
          class="MuiBox-root css-29x6sm"
          style="
            box-sizing: inherit;
            font-weight: 400;
            font-size: 16px;
            padding: 32px 0;
            margin: 0;
            letter-spacing: 0.15008px;
            line-height: 1.5;
            background-color: #f2f5f7;
            font-family: &quot;Helvetica Neue&quot;, &quot;Arial Nova&quot;,
              &quot;Nimbus Sans&quot;, Arial, sans-serif;
            color: #242424;
          "
        >
          <div
            style="
              box-sizing: inherit;
              display: none;
              overflow: hidden;
              line-height: 1px;
              opacity: 0;
              max-height: 0;
              max-width: 0;
            "
          >
            If you didn&#x27;t request a reset, don&#x27;t worry. You can safely
            ignore this email.
            <div style="box-sizing: inherit"></div>
          </div>
          <table
            align="center"
            width="100%"
            style="
              box-sizing: inherit;
              background-color: #ffffff;
              max-width: 600px;
              min-height: 48px;
            "
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            bgcolor="#FFFFFF"
          >
            <tbody style="box-sizing: inherit">
              <tr style="box-sizing: inherit; width: 100%">
                <td style="box-sizing: inherit">
                  <div
                    style="
                      padding: 24px 24px 8px 24px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <img
                      src="https://evse.s3.ap-northeast-2.amazonaws.com/crocus_full_logo.png"
                      style="
                        box-sizing: inherit;
                        display: inline-block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                        vertical-align: middle;
                        max-width: 100%;
                        height: 40px;
                      "
                      height="40"
                    />
                  </div>
                  <div
                    style="
                      font-family: inherit;
                      font-weight: bold;
                      padding: 32px 24px 0px 24px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <!-- <h3
                      style="
                        box-sizing: inherit;
                        margin-top: 40px;
                        margin-bottom: 16px;
                        font-weight: inherit;
                        margin: 0;
                        font-size: 20px;
                      "
                    >
                      회원가입
                    </h3> -->
                  </div>
                  <div
                    style="
                      color: #474849;
                      font-family: inherit;
                      font-size: 14px;
                      font-weight: normal;
                      padding: 8px 24px 16px 24px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <div class="MuiBox-root css-vii0ua" style="box-sizing: inherit">
                      <div style="box-sizing: inherit">
                        <p
                          style="
                            box-sizing: inherit;
                            margin-top: 0px;
                            margin-bottom: 0px;
                          "
                        >
                          잘못 수신된 메세지일 경우 무시해주세요.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style="
                      font-family: inherit;
                      font-size: 14px;
                      font-weight: bold;
                      padding: 12px 24px 32px 24px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <a
                      href="${process.env.FRONT_HOST}/register/${validKey}"
                      target="_blank"
                      style="
                        box-sizing: inherit;
                        background-color: #2458af;
                        color: #ffffff;
                        padding: 0px 0px;
                        border-radius: 64px;
                        width: auto;
                        display: inline-block;
                        line-height: 100%;
                        text-decoration: none;
                        max-width: 100%;
                      "
                      ><span style="box-sizing: inherit"
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: undefinedpx;
                              mso-font-width: -100%;
                              mso-text-raise: 0;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ><span
                        style="
                          box-sizing: inherit;
                          background-color: #2458af;
                          color: #ffffff;
                          padding: 12px 20px;
                          border-radius: 64px;
                          width: auto;
                          display: inline-block;
                          max-width: 100%;
                          line-height: 120%;
                          text-decoration: none;
                          text-transform: none;
                          mso-padding-alt: 0px;
                          mso-text-raise: 0;
                          font-size: large;
                        "
                        >비밀번호 변경</span
                      ><span style="box-sizing: inherit"
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: undefinedpx;
                              mso-font-width: -100%;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ></a
                    >
                  </div>
                  <!-- <div
                    style="
                      padding: 16px 24px 16px 24px;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <hr
                      style="
                        box-sizing: inherit;
                        margin: 0px;
                        width: 100%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                        border-color: rgb(233, 233, 233);
                        border-top-width: 1px;
                      "
                    />
                  </div>
                  <div
                    style="
                      color: #474849;
                      font-family: inherit;
                      font-size: 12px;
                      font-weight: normal;
                      padding: 4px 24px 24px 24px;
                      text-align: left;
                      max-width: 100%;
                      box-sizing: border-box;
                    "
                  >
                    <div class="MuiBox-root css-vii0ua" style="box-sizing: inherit">
                      <div style="box-sizing: inherit">
                        <p
                          style="
                            box-sizing: inherit;
                            margin-top: 0px;
                            margin-bottom: 0px;
                          "
                        >
                          Need help? Just reply to this email to contact support.
                        </p>
                      </div>
                    </div>
                  </div> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
    `;
  }
}

export const GenerateTemplateProvider: Provider = {
  provide: GenerateTemplateUtil,
  useFactory: () => new GenerateTemplateUtil(),
};
