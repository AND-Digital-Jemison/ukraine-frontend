import { connect, styled } from 'frontity';
import Link from '@frontity/components/link';

const Menu = ({ state }) => {
  const { source, router } = state;

  const links = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Polish',
      link: '/bezplatna-porada-dotyczaca-imigracji-do-wielkiej-brytanii-dla-ukraincow/',
    },
  ]

  return (
    <nav>
      <ul>
        { links.map(({ name, link }) => {
          const isActive = router.link === link;

          return (
            <MenuItem key={link} className={isActive ? 'active' : ''}>
              <Link link={link}>
                { name }
              </Link>
            </MenuItem>
          )
        })}
      </ul>
    </nav>
  )
}

const MenuItem = styled.li`
  display: inline-block;
  padding: 0 1em;

  &.active {
    background-color: green;
  }
`;

export default connect(Menu);
