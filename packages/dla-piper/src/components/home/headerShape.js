import { styled } from 'frontity';

const HeaderShape = () => {
  return (
    <HeaderShapeStyle>
      <svg
        width="1024"
        height="31"
        viewBox="0 0 1024 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100vw',
          minWidth: '400px',
          height: 'auto',
        }}
      >
        <path d="M512 31L0 0H1024L512 31Z" fill="#F8F8F8" />
      </svg>
    </HeaderShapeStyle>
  );
};

const HeaderShapeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export default HeaderShape;
