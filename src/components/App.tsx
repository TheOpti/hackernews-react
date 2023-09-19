import { Link } from './Link/Link';

import './App.css';

export const App = () => {
  const linksToRender = [
    {
      id: 'link-id-1',
      description: 'Prisma gives you a powerful database toolkit 😎',
      url: 'https://prisma.io'
    },
    {
      id: 'link-id-2',
      description: 'The best GraphQL client',
      url: 'https://www.apollographql.com/docs/react/'
    }
  ];

  return (
    <div>
      <h1>Hackernews Clone</h1>
      {linksToRender.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default App;
