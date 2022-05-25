import { connect, styled } from 'frontity';
import Link from '@frontity/components/link';

const List = ({ state }) => {

  const { source, router } = state;
  const data = source.get(router.link);

  return (
    <>
      { data.items.map(item => {
        const post = source[item.type][item.id];

        return (
          <ListItems>
            <Link key={post.id} link={post.link}>
              { post.title.rendered }
              <br />
            </Link>
          </ListItems>
        )
      })}
    </>
  );
};


const ListItems = styled.div`
  & > a {
    display: block;
    margin: 6px 0;
    font-size: 1.2em;
    color: steelblue;
    text-decoration: none;
  }
`;

export default connect(List);
