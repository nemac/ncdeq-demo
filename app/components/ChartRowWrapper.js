var React = require('react');
var PropTypes = React.PropTypes;
import Treemap from '../treemap/treemap.jsx';
require('../treemap/styles.css');
var {makeTreeFromHuc12Data, makeTreeFromHuc8Data} = require('../treemap/core.js');

var ChartRowWrapper = React.createClass({
  propTypes: {
    title: PropTypes.string,
  },
  getDefaultProps: function() {
    return {
      title:'Title'
    };
  },
  render: function() {
    //capture props and make sure that ther is actuall data.  in first render could come back as undefined and
    //  this will error out.
    var level_data = false;
    var level_props = {};
    if (this.props.level_data.length > 0) {
      level_props.root = makeTreeFromHuc8Data(this.props.level_data);
      level_data = true;
    }

    var id_data = false;
    var id_props = {};
    if (this.props.id_data.length > 0) {
      id_props.root = makeTreeFromHuc12Data(this.props.id_data);
      id_data = true;
    }

    //build chart data component and when there is no data returned
    //  Tell user no chart data Available
    let chart;
    if (id_data){
      chart = <Treemap {...id_props}/>
    } else if (level_data) {
      chart = <Treemap {...level_props}/>
    } else {
      chart = "No Chart Data Available"
    }

    return (
      <div className="ui segments">
        <div className="ui grey tertiary inverted clearing segment">
          <h4 className="ui left floated header">
            {this.props.title}
          </h4>
          <h4 className="ui right floated header">
            <i className="dropdown icon"></i>
          </h4>
        </div>
        <div className="ui basic segment">
          {chart}
          <br />
          <br />
          <p>Navigate to a view chart data</p>
          <div refs={this.props.title} >
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ChartRowWrapper;
