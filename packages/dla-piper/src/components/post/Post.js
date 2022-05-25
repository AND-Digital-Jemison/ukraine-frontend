import { connect } from 'frontity';

const Post = ({ state }) => {
  const { source, router } = state;
  const data = source.get(router.link);
  const post = source[data.type][data.id];

  return (
    <div>
      <h2>{ post.title.rendered }</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
  )
}

export default connect(Post);
