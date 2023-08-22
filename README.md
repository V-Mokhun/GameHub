# GameHub

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/v-mokhun/gamehub">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 50"
          height="50"
          width="100"
					color="#ff9100"
        >
          <g>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 100 59"
            >
              <path
                d="M97.901 18l-0.003 0.001C96.896 7.895 88.372 0 78 0c-3.855 0-7.444 1.11-10.498 3H32.498C29.444 1.11 25.855 0 22 0 11.628 0 3.104 7.895 2.102 18.001L2.099 18C1.751 22.175 0 50.691 0 51c0 4.418 3.581 8 8 8 18.377 0 25.943-15.686 28.666-24h26.668C66.057 43.314 73.623 59 92 59c4.419 0 8-3.582 8-8C100 50.691 98.249 22.175 97.901 18zM22 32c-6.629 0-12-5.373-12-12S15.371 8 22 8s12 5.373 12 12S28.629 32 22 32zM78 32c-6.629 0-12-5.373-12-12S71.371 8 78 8s12 5.373 12 12S84.629 32 78 32z"
                fill="currentColor"
              />
              <polygon
                points="31,17 25,17 25,11 19,11 19,17 13,17 13,23 19,23 19,29 25,29 25,23 31,23 "
                fill="currentColor"
              />
              <path
                d="M78 16c0 2.21-1.79 4-4 4-2.205 0-4-1.79-4-4s1.795-4 4-4C76.21 12 78 13.79 78 16z"
                fill="currentColor"
              />
              <path
                d="M86 24c0 2.21-1.79 4-4 4-2.205 0-4-1.79-4-4s1.795-4 4-4C84.21 20 86 21.79 86 24z"
                fill="currentColor"
              />
            </svg>
          </g>
        </svg>
  </a>

  <p align="center">
GameHub is your one-stop destination for everything gaming. Whether you're an avid gamer or just starting your journey, GameHub offers a platform where you can explore, connect, and conquer.
    <br />
    <br />
    <a href="https://github.com/v-mokhun/gamehub">View Site</a>
    ·
    <a href="https://github.com/v-mokhun/gamehub/issues">Report Bug</a>
    ·
    <a href="https://github.com/v-mokhun/gamehub/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#challenges">Challenges</a></li>
        <li><a href="#future-plans">Future Plans</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#running-the-app">Running the App</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li>
		<a href="#usage">Usage</a>
		      <ul>
        <li><a href="#sign-up-page">Sign Up Page</a></li>
        <li><a href="#home-page">Home Page</a></li>
        <li><a href="#adding-game-to-library">Adding Game To Library</a></li>
        <li><a href="#browse-page">Browse Page</a></li>
        <li><a href="#game-page">Game Page</a></li>
        <li><a href="#settings-page">Settings Page</a></li>
        <li><a href="#community-page">Community Page</a></li>
        <li><a href="#profile-page">Profile Page</a></li>
        <li><a href="#friends-page">Friends Page</a></li>
        <li><a href="#library-page">Library Page</a></li>
        <li><a href="#ratings-page">Ratings Page</a></li>
        <li><a href="#messages-page">Messages Page</a></li>
        <li><a href="#chat-page">Chat Page</a></li>
      </ul></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Home Screenshot][home]](https://example.com)

🎮 Discover Games: Dive into a vast collection of games from various genres, categories, and themes. Our curated selection ensures you never miss the next gaming masterpiece.

📊 Track Your Progress: Stay on top of your gaming achievements with our progress tracking system. You can watch your gaming journey unfold in real-time.

👥 Connect with Friends: Finding like-minded gamers is a breeze on GameHub. Connect with friends, see their library and share your gaming triumphs.

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url] For Server Side Rendering
- [![TypeScript][TypeScript.org]][TypeScript-url] For Type Safety
- [![Clerk][Clerk.com]][Clerk-url] For Authentication
- [![ReactHookForm][ReactHookForm.com]][ReactHookForm-url] For Form Handling
- [![Zod][Zod.dev]][Zod-url] For Form Validation
- [![ReactQuery][ReactQuery.com]][ReactQuery-url] For Data Fetching
- [![Zustand][Zustand.com]][Zustand-url] For State Management
- [![TailwindCSS][TailwindCSS.com]][TailwindCSS-url] With [![RadixUI][RadixUI.com]][RadixUI-url] For UI Components
- [![Pusher][Pusher.com]][Pusher-url] For Realtime Chat
- [![Prisma][Prisma.io]][Prisma-url] For Database
- [![PlanetScale][PlanetScale.com]][PlanetScale-url] For Database Hosting
- [![Vercel][Vercel.com]][Vercel-url] For Hosting

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Challenges

- One of the challenges I faced was finding out how to fetch the IGDB Api correctly, which included using axios interceptors to keep the token updated, Next.js rewrites to avoid proxy issues and writing custom functions to create body for requests.
- Another challenge was to handle the data from IGDB Api, which was not always consistent and required a lot of data manipulation.
- It was also challenging to handle the cache correctly, when and how to invalidate it, how to use it with realtime chat and how to use it with IGDB Api.
- Lastly, it was challenging to implement the realtime chat, which required a lot of research and testing.

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Future Plans

In the future I plan to:

- Write tests with probably playwright
- Add an abiliity to write game reviews
- It would be nice to be able to import your games from Steam, although I am not sure if it is possible

<p align="right">(<a href="#gamehub">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple example steps.

### Running the app

1. Clone the repo
   ```sh
   git clone https://github.com/v-mokhun/gamehub.git .
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the app (Will not work without environment variables)
   ```sh
   npm run dev
   ```

### Environment Variables

1. Create a .env file in the root of the project and copy all contents from .env.example file.
2. Register on [Clerk](https://clerk.dev/) and create a new application, then grab your publishable key and secret key. Then go to webhooks and grab your webhook secret. For local testing you can use ngrok to create a tunnel to your localhost. Important: make sure to add your ngrok url to the webhook url in Clerk.
3. In [Clerk Dashboard](dashboard.clerk.dev) go to Users & Authentication -> Social Connections and enable Google, GitHub and Twitch. Here is an detailed [guide](https://clerk.com/docs/authentication/social-connections/oauth) on how to do it.
4. Register on [Twitch](https://dev.twitch.tv/) and create a new application, then grab your client id and client secret and as OAuth Redirect URLs insert your Clerk OAuth Callback.
5. Register on [PlanetScale](https://planetscale.com/) and create a new database, then grab your database url by clicking on Connect button.
6. Register on [Pusher](https://pusher.com/) and create a new channel, then grab your app id, key, secret and cluster.
7. Lastly, register on [Cloudinary](https://cloudinary.com/) and grab your cloud name. Furthermore, you will need to create a new preset and make it unsigned and also put its name in .env file. You can also use your own image hosting service, just make sure to change the code accordingly.

<p align="right">(<a href="#gamehub">back to top</a>)</p>

## Usage

Project works best when you are logged in, but it's not required.

### Sign Up Page

On the sign up page you can sign up with your email, google, github or twitch. After signing up with an email you will be redirected to verify your email by providing a code.

[![Sign Up Screenshot][sign-up]](https://example.com)
[![Verify Code Screenshot][verify-code]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Home Page

#### /

On the home page you can see an example of a game card, which you cant either click to go to a game page, or click on the plus icon to add game to your library. You can also see a list of featured and top rated games.

[![Home Card Screenshot][home-card]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Adding Game to Library

By clicking on either Plus or Edit Icon on the game card you can add or edit game in your library. Available options are: status, rating, hours played, finished date and notes.

[![Add Game Screenshot][add-game]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Browse Page

#### /browse

On the browse page you can search for games by name. You can also filter games by genre, platform, theme, mode and rating. You can also sort games by rating and release date.

[![Browse Screenshot][browse]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Game Page

#### /game/[id]

On the game page you can see all the information about the game, including screenshots, videos, description, rating, release date, platforms, genres, themes, modes, developers. Games from the Franchise and Similar Games to the one you are currently observing are included. You can also add game to your library by clicking on the plus icon.

[![Game Page Screenshot][game]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Settings Page

#### /settings

On the settings page you can change your profile picture, username, password and delete your account.

[![Settings Screenshot][settings]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Community Page

#### /users

On the community page you can see all the users, search them by username. You can send a friend request to a user or chat with hime. You can also click on a user to see their profile.

[![Community Screenshot][community]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Profile Page

#### /users/[username]

On the profile page you can see when the user joined, their rated games and games they want to play. Note: you can only see their games if they have public library.

[![Profile Screenshot][profile]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Library Page

#### /users/[username]/library

On the library page you can see all the games the user has in their library. You can also filter games by status and user rating. You can also sort games by user rating, play time, date added and edited. Note: you can only see this page if user has public library.

[![Library Screenshot][library]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Friends Page

#### /users/[username]/friends

On the friends page you can see all your friends, search them by username. You can also click on a user to see their profile. From there you can also go to the Friend Request page to see all your friend requests.

[![Friends Screenshot][friends]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Ratings Page

#### /users/[username]/ratings

On the ratings page you can see an area graph of user's ratings and also pie chart on distribution of ratings.

[![Ratings Screenshot][ratings]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Messages Page

#### /messages

On the messages page you can see all your conversations. You can also click on a user to see your conversation with them.

[![Messages Screenshot][messages]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Chat Page

#### /messages/[username]

On the chat page you can chat with users. You can also see if they are online or offline. You can also see what messages are unread.

[![Chat Screenshot][chat]](https://example.com)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#gamehub">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#gamehub">back to top</a>)</p>

## Contact

[Telegram](https://t.me/v_mokhun)

[LinkedIn](https://www.linkedin.com/in/volodymyr-mokhun-35005723b/)

Project Link: [https://github.com/v-mokhun/gamehub](https://github.com/v-mokhun/gamehub)

<p align="right">(<a href="#gamehub">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/v-mokhun/gamehub.svg?style=for-the-badge
[contributors-url]: https://github.com/v-mokhun/gamehub/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/v-mokhun/gamehub.svg?style=for-the-badge
[forks-url]: https://github.com/v-mokhun/gamehub/network/members
[stars-shield]: https://img.shields.io/github/stars/v-mokhun/gamehub.svg?style=for-the-badge
[stars-url]: https://github.com/v-mokhun/gamehub/stargazers
[issues-shield]: https://img.shields.io/github/issues/v-mokhun/gamehub.svg?style=for-the-badge
[issues-url]: https://github.com/v-mokhun/gamehub/issues
[license-shield]: https://img.shields.io/github/license/v-mokhun/gamehub.svg?style=for-the-badge
[license-url]: https://github.com/v-mokhun/gamehub/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/volodymyr-mokhun-35005723b/
[sign-up]: readme-images/sign-up.png
[verify-code]: readme-images/verify-code.png
[home]: readme-images/home.png
[home-card]: readme-images/home.png
[browse]: readme-images/browse.png
[add-game]: readme-images/add-game.png
[game]: readme-images/game-page.png
[settings]: readme-images/settings.png
[community]: readme-images/community.png
[profile]: readme-images/profile.png
[library]: readme-images/library.png
[friends]: readme-images/friends.png
[ratings]: readme-images/ratings.png
[messages]: readme-images/messages.png
[chat]: readme-images/chat.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[PlanetScale.com]: https://img.shields.io/badge/planetscale-%23000000.svg?style=for-the-badge&logo=planetscale&logoColor=white
[PlanetScale-url]: https://planetscale.com/
[ReactQuery.com]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
[ReactQuery-url]: https://tanstack.com/query/latest
[ReactHookForm.com]: https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white
[ReactHookForm-url]: https://react-hook-form.com/
[TailwindCSS.com]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Vercel.com]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[TypeScript.org]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Prisma.io]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[RadixUI.com]: https://img.shields.io/static/v1?style=for-the-badge&message=Radix+UI&color=161618&logo=Radix+UI&logoColor=FFFFFF&label=
[RadixUI-url]: https://www.radix-ui.com/
[Zod.dev]: https://img.shields.io/static/v1?style=for-the-badge&message=Zod&color=3E67B1&logo=Zod&logoColor=FFFFFF&label=
[Zod-url]: https://zod.dev/
[Pusher.com]: https://img.shields.io/static/v1?style=for-the-badge&message=Pusher&color=300D4F&logo=Pusher&logoColor=FFFFFF&label=
[Pusher-url]: https://pusher.com/
[Zustand.com]: https://img.shields.io/static/v1?style=for-the-badge&message=Zustand&color=FFD400&logo=Zustand&logoColor=FFFFFF&label=
[Zustand-url]: https://zustand-demo.pmnd.rs/
[Clerk.com]: https://img.shields.io/static/v1?style=for-the-badge&message=Clerk&color=000000&logo=Clerk&logoColor=FFFFFF&label=
[Clerk-url]: https://clerk.com/
