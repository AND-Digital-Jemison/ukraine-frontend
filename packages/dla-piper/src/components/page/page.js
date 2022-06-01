import { connect } from "frontity";
import dayjs from "dayjs";

const Page = ({ state, libraries }) => {
  const { source, router } = state;
  const data = source.get(router.link);
  const post = source[data.type][data.id];
  const author = source.author[post.author];
  const Html2React = libraries.html2react.Component;

  const formattedDate = dayjs(post.date).format("DD MMMM YYYY");

  return (
    <div>
      <h2>{post.title.rendered}</h2>
      <p>
        <strong>Posted: </strong>
        {formattedDate}
      </p>
      <p>
        <strong>Author: </strong>
        {author.name}
      </p>
      <Html2React html={post.content.rendered} />
      {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
    </div>
  );
};

export default connect(Page);
