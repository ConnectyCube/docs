---
title: Email templates
sidebar: 
    label: Email templates
    order: 13
---


In ConnectyCube, email templates are designed to simplify user communication by allowing admins to customize and manage email notifications for their apps. These templates cover various user interactions, such as account confirmations, password resets, and notifications, ensuring consistent branding and messaging. Admins can easily update these templates in the admin panel to align with their specific needs, providing a personalized experience for users.

## 'Welcome email' template

**A welcome email** is the first message sent to new users after they sign up. It introduces them to the app, provides essential information, and guides them on how to get started. In ConnectyCube, the welcome email template can be customized by admins to match their brand, include helpful links or tutorials, and set the tone for future interactions. It’s a valuable opportunity to make a strong first impression and engage users from the start.

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Open Sans;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    body {
      -webkit-animation-duration: 0.1s;
      -webkit-animation-name: fontfix;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 0.1s;
    }

    @-webkit-keyframes fontfix{
      from{ 	opacity: 1; }
      to{	opacity: 1; }
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <style type="text/css">
    @font-face{
      font-family:'Open Sans';
      font-style:normal;
      font-weight:400;
      src:local('Open Sans'),
      local('OpenSans'),
      url('https://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff') format('woff');
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100%!important;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .mj-hero-content {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="background: '#eaf0f0;' font-family: 'Open Sans', Open Sans, Arial, Helvetica">
<div style="background-color:#eaf0f0;">
  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:45px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:199px;height:44px;">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-large.png"  height='auto' width='162' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;background:#ffffff;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-top:0px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:34px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:34px;font-weight:300;line-height:22px;">
                    Welcome and thanks for joining!
                  </div>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">
                    <p> Congratulations! You've been registered on #{app.title}  with email #{user.email}</p><br />
                    <div/>

                    <div align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28" padding-bottom="0px">
                      <p><span style="font-weight: 600">
                Some greeting goes here
              </span></p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">

                    <mj-text align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28">
                      <i>Best regards,<br />
                        #{app.title} Team</i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  <!--[if mso | IE]>


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:50px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:44px;height:44px">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-short.png"  height='auto' width='44' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <div style="cursor:auto;color:#666666;font-size:13px;line-height:22px;">Copyright © 2020 ConnectyCube. All rights reserved.<br /> You are receiving this email because you have registered for ConnectyCube.
                    <br>
                    <a href="#" style='color:#666666'>Unsubscribe</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
</div>
</body>

</html>
```

## 'Reset password' template

The **Reset Password template** is an email sent to users who request to reset their password. It includes a secure link or instructions to create a new password, helping users quickly regain access to their accounts. Admins in ConnectyCube can customize this template to ensure consistent branding and provide a good assistance for users needing password assistance.

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Open Sans;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    body {
      -webkit-animation-duration: 0.1s;
      -webkit-animation-name: fontfix;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 0.1s;
    }

    @-webkit-keyframes fontfix{
      from{ 	opacity: 1; }
      to{	opacity: 1; }
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <style type="text/css">
    @font-face{
      font-family:'Open Sans';
      font-style:normal;
      font-weight:400;
      src:local('Open Sans'),
      local('OpenSans'),
      url('https://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff') format('woff');
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100%!important;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .mj-hero-content {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="background: #eaf0f0; font-family: 'Open Sans', Open Sans, Arial, Helvetica">
<div style="background-color:#eaf0f0;">
  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:45px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:199px;height:44px;">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-large.png"  height='auto' width='162' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;background:#ffffff;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-top:0px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:34px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:34px;font-weight:300;line-height:22px;">
                    Reset password
                  </div>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">
                    <p style="margin-bottom:30px">
                      Please click the <a href="https://admin.connectycube.com/user_email/password_reset?token=#{user.get_reset_password_token}" target="_blank" style="color:#0b7bbb; text-decoration:none">link</a> to reset your #{app.title} password.
                    </p>
                    <p style="margin-bottom:35px">
                      Your password will remain the same if no action is taken.
                    </p>
                  <div/>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">

                    <mj-text align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28">
                      <i>Best regards,<br />
                        #{app.title} Team</i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  <!--[if mso | IE]>



  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:50px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:44px;height:44px">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-short.png"  height='auto' width='44' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <div style="cursor:auto;color:#666666;font-size:13px;line-height:22px;">Copyright © 2020 ConnectyCube. All rights reserved.<br /> You are receiving this email because you have registered for ConnectyCube.
                    <br>
                    <a href="#" style='color:#666666'>Unsubscribe</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
</div>
</body>

</html>
```

## 'Email confirmation' template

The **Email Confirmatio** template is an email sent to users after they register, asking them to verify their email address. It includes a link or code to confirm their identity, helping to secure their account and activate access. In ConnectyCube, admins can customize this template to maintain consistent branding and guide users through the verification process smoothly.

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Open Sans;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    body {
      -webkit-animation-duration: 0.1s;
      -webkit-animation-name: fontfix;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 0.1s;
    }

    @-webkit-keyframes fontfix{
      from{ 	opacity: 1; }
      to{	opacity: 1; }
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <style type="text/css">
    @font-face{
      font-family:'Open Sans';
      font-style:normal;
      font-weight:400;
      src:local('Open Sans'),
      local('OpenSans'),
      url('https://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff') format('woff');
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100%!important;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .mj-hero-content {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="background: #eaf0f0; font-family: 'Open Sans', Open Sans, Arial, Helvetica">
<div style="background-color:#eaf0f0;">
  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:45px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:199px;height:44px;">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-large.png"  height='auto' width='162' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;background:#ffffff;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-top:0px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:34px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:34px;font-weight:300;line-height:22px;">
                    Welcome and thanks for joining!
                  </div>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">
                    <p>Please confirm your registration by following <a href="https://admin.conectycube.com/user_email/confirm_email?token=#{user.get_confirmation_token}">the link</a></p><br />
                    <div/>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">

                    <mj-text align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28">
                      <i>Best regards,<br />
                        #{app.title} Team</i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  <!--[if mso | IE]>


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:50px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:44px;height:44px">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-short.png"  height='auto' width='44' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <div style="cursor:auto;color:#666666;font-size:13px;line-height:22px;">Copyright © 2020 ConnectyCube. All rights reserved.<br /> You are receiving this email because you have registered for ConnectyCube.
                    <br>
                    <a href="#" style='color:#666666'>Unsubscribe</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
</div>
</body>

</html>
```

## 'Recording done' template

The **Recording Done** template is an email notification sent to users when their audio or video recording has successfully completed. This email can include details such as a link to access or download the recording. In ConnectyCube, admins can customize this template to align with their branding and provide users with easy access to their recordings.

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Open Sans;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    body {
      -webkit-animation-duration: 0.1s;
      -webkit-animation-name: fontfix;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 0.1s;
    }

    @-webkit-keyframes fontfix{
      from{ 	opacity: 1; }
      to{	opacity: 1; }
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <style type="text/css">
    @font-face{
      font-family:'Open Sans';
      font-style:normal;
      font-weight:400;
      src:local('Open Sans'),
      local('OpenSans'),
      url('https://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff') format('woff');
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100%!important;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .mj-hero-content {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="background: #eaf0f0; font-family: 'Open Sans', Open Sans, Arial, Helvetica">
<div style="background-color:#eaf0f0;">
  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:45px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:199px;height:44px;">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-large.png"  height='auto' width='162' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;background:#ffffff;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-top:0px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">
                    <div align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28" padding-bottom="0px">
                      Please use the link(s) below to have access to 'Meeting recording':<br>
                      {{{ renderRecordLinks(recording.download_record_link) }}}
                      <br>
                      This links will expire in #{recording.link_expire_in_days} days
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  <!--[if mso | IE]>


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:50px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:44px;height:44px">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-short.png"  height='auto' width='44' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <div style="cursor:auto;color:#666666;font-size:13px;line-height:22px;">Copyright © 2020 ConnectyCube. All rights reserved.<br /> You are receiving this email because you have registered for ConnectyCube.
                    <br>
                    <a href="#" style='color:#666666'>Unsubscribe</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
</div>
</body>

</html>
```

## 'Meeting notification' template

The **Schedule a Meeting** template is an email notification sent to users to confirm a new meeting appointment. It includes important details like the date, time, and meeting link, helping users prepare and join the meeting. In ConnectyCube, admins can customize this template to reflect their brand and ensure users receive clear, helpful information for upcoming meetings.

```html
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      font-family: Open Sans;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    body {
      -webkit-animation-duration: 0.1s;
      -webkit-animation-name: fontfix;
      -webkit-animation-iteration-count: 1;
      -webkit-animation-timing-function: linear;
      -webkit-animation-delay: 0.1s;
    }

    @-webkit-keyframes fontfix{
      from{ 	opacity: 1; }
      to{	opacity: 1; }
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <style type="text/css">
    @font-face{
      font-family:'Open Sans';
      font-style:normal;
      font-weight:400;
      src:local('Open Sans'),
      local('OpenSans'),
      url('https://fonts.gstatic.com/s/opensans/v10/cJZKeOuBrn4kERxqtaUH3bO3LdcAZYWl9Si6vvxL-qU.woff') format('woff');
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100,
      * [aria-labelledby="mj-column-per-100"] {
        width: 100%!important;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      .mj-hero-content {
        width: 100% !important;
      }
    }
  </style>
</head>

<body style="background: #eaf0f0; font-family: 'Open Sans', Open Sans, Arial, Helvetica">
<div style="background-color:#eaf0f0;">
  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:45px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:199px;height:44px;">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-large.png"  height='auto' width='162' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                     </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;background:#ffffff;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-top:0px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-bottom:0px;" align="left">
                  <div style="cursor:auto;color:#1f1f1f;font-family: 'Open Sans', Open Sans, Arial, Helvetica, sans-serif;font-size:15px;font-weight:normal;line-height:28px;">
                    <div align="left" font-family="Open Sans" font-size="15px" font-weight="normal" color="#1f1f1f" line-height="28" padding-bottom="0px">
                      <div>
                        <div>
                          <b>Meeting Link:</b>
                        </div>
                        <div>
                          !{renderMeetingUrl(app.meeting_url_template, meetingData.meeting._id)}
                        </div>
                      </div>
                      <div>
                        <div>
                          <b>When:</b>
                        </div>
                        <div>
                          #{meetingData.meeting.start_date}
                        </div>
                      </div>
                      <div>
                        <div>
                          <b>Guests:</b>
                        </div>
                        <div>
                          <ul>
                            <li>#{meetingData.host.email} - organizer</li>
                            !{renderMeetingAttendees(meetingData.attendees)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
  <!--[if mso | IE]>


  <!--[if mso | IE]>
  <table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
  <![endif]-->
  <div style="margin:0 auto;max-width:600px;">
    <table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0">
      <tbody>
      <tr>
        <td style="text-align:center;vertical-align:top;font-size:0px;padding:20px 0px;padding-bottom:45px;padding-top:50px;">
          <!--[if mso | IE]>
          <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;">
          <![endif]-->
          <div aria-labelledby="mj-column-per-100" class="mj-column-per-100" style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;">
            <table cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                    <tbody>
                    <tr>
                      <td style="width:44px;height:44px">
                        <img src="https://admin.connectycube.com/assets/images/mailers/logo-short.png"  height='auto' width='44' style="border:none;display:block;outline:none;text-decoration:none;width:100%;height:auto;">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                  <div style="cursor:auto;color:#666666;font-size:13px;line-height:22px;">Copyright © 2020 ConnectyCube. All rights reserved.<br /> You are receiving this email because you have registered for ConnectyCube.
                    <br>
                    <a href="#" style='color:#666666'>Unsubscribe</a>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <!--[if mso | IE]>
  </td></tr></table>
  <![endif]-->
</div>
</body>

</html>
```