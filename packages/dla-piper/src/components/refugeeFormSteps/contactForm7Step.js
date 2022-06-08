import { connect } from 'frontity'
import { Step } from '../common/form'

const contactForm7Step = ({ state, libraries }) => {
  const data = state.source.get('/who-are-you-form');
  const form = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  return (
    <Step label={'no label'}> 

      <Html2React html={form.content.rendered} />
    </Step>
  )
}

export default connect(contactForm7Step);