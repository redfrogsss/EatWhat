# EatWhat - A simple lunch/dinner picker

[EatWhat-app](https://github.com/redfrogsss/EatWhat-app) - The mobile app version of the website 

## What is this?

This app allows users to start a vote and ask their friends to choose what to eat for the lunch or dinner. 

This app tries to solve a simple yet annoying problem: `What should we eat for lunch / dinner?`. To solve this problem, the user who start the vote need to input a set of options for lunch / dinner. Then, his/her friends could enter the vote using a code and choose their preferred options or choose randomly by clicking a button. At the end, the option with the highest votes will be the final choice.

## Getting Started 

### Frontend
```bash
cd frontend && yarn && yarn run dev
```

### Backend
```bash
cd backend && deno run -A app.ts
```

### Database
```bash
cd db && docker-compose up -d
```

## Learn More

The following tech is used in this project:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind CSS Typography](https://tailwindcss.com/docs/typography-plugin)
- [DaisyUI](https://daisyui.com/)
