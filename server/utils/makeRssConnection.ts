import PostModel from '../models/Post';
import bcrypt from 'bcrypt';
import UserModel from '../models/User';

const createUserHandler = async () => {
  const password = '12345678';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const doc: any = new UserModel({
    email: 'admin@admin.com',
    fullName: 'Admin',
    avatarUrl:
      'https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg',
    passwordHash: hash,
  });

  const user = await doc.save();
  const { passwordHash, ...userData } = user._doc;

  return { ...userData };
};

export default () => {
  const cron = require('node-cron');
  let Parser = require('rss-parser');
  let parser = new Parser();

  cron.schedule('0 * * * *', function () {
    console.log('---------------------');
    console.log('running a task every hour');

    (async () => {
      let feed = await parser.parseURL('https://lifehacker.com/rss');
      const { title, content, contentSnippet } = feed.items[0];
      const text = contentSnippet.toString().slice(0, -14);

      let expression = /(https?:\/\/.*\.(?:png|jpg))/g;
      let regex = new RegExp(expression);
      let imageUrl = content.match(regex)[0];

      let user: any = await UserModel.findOne({ fullName: 'Admin' });

      if (!user) {
        console.log('User is not found');
        user = await createUserHandler();
      }

      const article = {
        title,
        text,
        imageUrl,
        user: user._id.toString(),
      };

      // console.log(article);

      PostModel.findOne({ title: title }, async (err, obj) => {
        if (err) {
          console.log(err);
        } else {
          if (obj) {
            console.log('is article');
          } else {
            console.log('no article');
            const doc = new PostModel(article);

            const post = await doc.save();

            console.log('post', post);
          }
        }
      });
    })();
  });
};
