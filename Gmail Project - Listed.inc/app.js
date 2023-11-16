const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const moment = require('moment');

const CLIENT_ID = '101065144727451182408';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://enally.in';
const AUTH_KEY = "AIzaSyCInZ9mZ-2Mf_d0q1vc6SKnvKGxBdYav1w"

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

async function login() {
  // Use the Google Sign-In API to authenticate the user and obtain an access token
  const { tokens } = await oauth2Client.getToken(AUTH_KEY);
  oauth2Client.setCredentials(tokens);
}

async function checkEmails() {
  // Fetch the list of emails in the user's inbox
  const res = await gmail.users.messages.list({ userId: 'me', labelIds: ['INBOX'] });

  // Loop through each email and check if it has any prior replies
  for (const message of res.data.messages) {
    const thread = await gmail.users.threads.get({ userId: 'me', id: message.threadId });

    // Check if any of the messages in the thread were sent by the user
    const hasReplies = thread.data.messages.some((msg) => msg.from.emailAddress !== 'YOUR_EMAIL_ADDRESS');

    // If the thread has no prior replies, send a new reply and add a label to the message
    if (!hasReplies) {
      const messageText = 'YOUR_REPLY_CONTENT';
      const quotedMessage = `> ${thread.data.messages[0].payload.body.data.replace(/\n/g, '\n> ')}\n\n`;
      const replyText = `${quotedMessage}${messageText}`;

      await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          threadId: message.threadId,
          raw: Buffer.from(replyText).toString('base64'),
        },
      });

      const labelName = 'YOUR_LABEL_NAME';
      const labels = await gmail.users.labels.list({ userId: 'me' });
      const label = labels.data.labels.find((l) => l.name === labelName);

      if (!label) {
        await gmail.users.labels.create({ userId: 'me', requestBody: { name: labelName } });
      }

      await gmail.users.messages.modify({
        userId: 'me',
        id: message.id,
        requestBody: {
          addLabelIds: [label.id],
          removeLabelIds: ['INBOX'],
        },
      });
    }
  }
}

async function run() {
  await login();

  while (true) {
    await checkEmails();
    const waitTime = moment.duration(moment().add(moment.random(75, 180), 'seconds').diff(moment())).asMilliseconds();
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}

run();
