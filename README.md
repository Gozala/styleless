# styleless #

Yet another alternative to CSS, with variables, functions, mixins. But now it's
all js.

## Install ##

    npm install styleless

## Examples ##

<table>
  <tr>
    <th>styleless</th>
    <th>css</th>
  </tr>
  <tr>
    <td>
      <pre>
var color = '#4D926F'
var variables = Style({
  '#header': { 
    color: color
  },
  h2: {
    color: color
  }
})
      </pre>
    </td>
    <td>
      <pre>
#header {
  color: #4D926F;
}
h2 {
  color: #4D926F;
}
      </pre>
    </td>
  </tr>
  <tr>
  <td>
      <pre>
function roundedCorners(radius) {
  return {
    'border-radius': radius,
    '-webkit-border-radius': radius,
    '-moz-border-radius': radius
  }
}
var mixins = Style({
  '#header': Style(roundedCorners('15px'), {
    color: 'red'
  }),
  '#footer': Style(roundedCorners('5px'), {
    background: 'blue'
  })
})
      </pre>
    </td>
    <td>
      <pre>
#header {
  border-radius: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  color: red;
}
#footer {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  background: blue;
}
      </pre>
    </td>
  </tr>
  <tr>
    <td>
      <pre>
var nestedRules = Style({
  '#header': {
    h1: {
      'font-size': '26px',
      'font-weight': 'bold'
    },
    p: {
      'font-size': '12px',

      a: {
        'text-decoration': 'none',

        ':hover': {
          'border-width': '1px'
        }
      }
    }
  }
})
      </pre>
    </td>
    <td>
      <pre>
#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}
      </pre>
  </tr>
</table>
