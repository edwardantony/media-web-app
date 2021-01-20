import { PageSettings } from './../../config/page-settings.js';
 
class PageWithoutSidebar extends React.Component {
  static contextType = PageSettings;
 
  componentDidMount() {
    this.context.handleSetPageSidebar(false);
  }
 
  componentWillUnmount() {
    this.context.handleSetPageSidebar(true);
  }
}
 
export default PageWithoutSidebar