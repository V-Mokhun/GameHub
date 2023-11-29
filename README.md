# GameHub

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://gamehub-proj.vercel.app/">
		<img src="readme-images/logo.png" alt="Logo" width="400" height="50">
  </a>

  <p align="center">
GameHub is your one-stop destination for everything gaming. Whether you're an avid gamer or just starting your journey, GameHub offers a platform where you can explore, connect, and conquer.
    <br />
    <br />
    <a href="https://gamehub-proj.vercel.app/">View Site</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

[![Home Screenshot][home]](https://gamehub-proj.vercel.app/)

🎮 Discover Games: Dive into a vast collection of games from various genres, categories, and themes. Our curated selection ensures you never miss the next gaming masterpiece.

📊 Track Your Progress: Stay on top of your gaming achievements with our progress tracking system. You can watch your gaming journey unfold in real-time.

👥 Connect with Friends: Finding like-minded gamers is a breeze on GameHub. Connect with friends, see their library and write your own game reviews.

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
- Another challenge was to implement import from Steam, which required a lot of research and testing. I had to find a way to get the user's Steam games, then find a way to get the game's data from IGDB Api and then find a way to import it into the database.
- Lastly, it was challenging to implement the realtime chat, which required a lot of research and testing. Especially, I tried to implement infinite scroll for messages, but it was not working correctly with the cache, so I had to abandon it.

<p align="right">(<a href="#gamehub">back to top</a>)</p>

### Future Plans

In the future I plan to:

- Write tests with probably playwright

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
7. Register on [Cloudinary](https://cloudinary.com/) and grab your cloud name. Furthermore, you will need to create a new preset and make it unsigned and also put its name in .env file. You can also use your own image hosting service, just make sure to change the code accordingly.
8. Go to [Steam](https://steamcommunity.com/dev/apikey) and grab your api key.
9. Go to [RapidAPI](https://rapidapi.com/api4ai-api4ai-default/api/nsfw3) and register if needed, then grab your api key for image moderation.
10. For tests to work properly, create test user and fill in the username and password in .env file

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

Project Link: [https://gamehub-proj.vercel.app](https://gamehub-proj.vercel.app)

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
[linkedin-url]: https://www.linkedin.com/in/volodymyr-mokhun/
[home]: readme-images/home.jpg
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
