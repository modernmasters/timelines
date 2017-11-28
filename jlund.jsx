var items = new vis.DataSet([
  {
    id:1,
    start: new Date(1985, 1, 31),
    content: 'Birth',
    img_url: 'https://modernmasters.org/wp-content/uploads/2016/10/headshot-john-150x150.jpg',
    group: 0
    // Optional: fields 'id', 'type', 'group', 'className', 'style'
  },
  {
    id:2,
    start: new Date(1999, 8, 1),
    end: new Date(2003, 5, 31),  // end is optional
    content: 'High School',
    img_url: '',
    group: 1
    // Optional: fields 'id', 'type', 'group', 'className', 'style'
  },
  {
    id:3,
    start: new Date(2003, 8, 1),
    end: new Date(2007, 5, 31),  // end is optional
    content: 'College',
    img_url: '',
    group: 1
    // Optional: fields 'id', 'type', 'group', 'className', 'style'
  }
  // more items...
]);

var timeline;
// create groups
var groups = new vis.DataSet()
groups.add({
  id: 0,
  content: 'Life'
});
groups.add({
  id: 1,
  content: 'Education'
});
  
// create items

var GroupTemplate = React.createClass({
  render: function() {
    var { group } = this.props;
    return <div>
        <label>{group.content}</label>
    </div>
  }
})
var ItemTemplate = React.createClass({
  render: function() {
    var { item } = this.props;
    return <div>
        <label>{item.content}</label>
        <img src={item.img_url} width="100" />
    </div>
  }
})
// specify options
var options = {
    orientation: 'top',
    maxHeight: 400,
    editable: true,
    configure: false,
    groupEditable: false,
    template: function (item, element) {
        if (!item) { return }
        ReactDOM.unmountComponentAtNode(element);
        return ReactDOM.render(<ItemTemplate item={item} />, element);
    },
    groupTemplate: function (group, element) {
        if (!group) { return }
        ReactDOM.unmountComponentAtNode(element);
        return ReactDOM.render(<GroupTemplate group={group} />, element);
    }
}

var VisTimeline = React.createClass({
    componentDidMount: function() {
        return initTimeline();
    },
    render: function() {
        return <div>
            <h1>John Lund Timeline</h1>   
            <div id="mytimeline"></div>
        </div>
    }
});
function initTimeline() {
  var container = document.getElementById('mytimeline');
  timeline = new vis.Timeline(container, items, groups, options);

  function onSelect (properties) {
    localStorage.setItem('selectedItem',properties.items);
  }

  // add event listener
  timeline.on('select', onSelect);
}

var ImgButton = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    console.log($('#img_url_input').val());
    items.update({id: localStorage.getItem('selectedItem'), img_url: $('#img_url_input').val()});
  },

  componentDidMount: function() {
    window.addEventListener('click', this.handleClick);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleClick);
  },

  render: function() {
    return <button className="btn btn-secondary" onClick={this.handleClick} type="button">Add Image to Event</button>;
  }
});

ReactDOM.render(<VisTimeline />, document.getElementById('root'));
ReactDOM.render(<ImgButton />, document.getElementsByClassName('input-group-btn')[0]);