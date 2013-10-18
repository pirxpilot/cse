var load = require('load');

/*global google */

function search(cx) {
  var searchBox = document.getElementById('cseSearchBox'),
    searchResults = document.getElementById('cseSearchResults');


  function render() {
    var cse = google.search.cse;

    if (searchBox) {
      cse.element.render({
        div: searchBox,
        tag: 'searchbox-only',
        attributes: {
          resultsUrl: '/search.html'
        }
      });
    }
    if (searchResults) {
      cse.element.render({
        div: searchResults,
        tag: 'searchresults-only',
        attributes: {
          linkTarget: '_top' // open links in the same window
        }
      });
    }
  }

  if (!searchBox && !searchResults) {
    return;
  }

  window.__gcse = {
    parsetags: 'explicit',
    callback: function() {
      if (document.readyState == 'complete') {
        render();
      } else {
        google.setOnLoadCallback(render, true);
      }
    }
  };

  load('//www.google.com/cse/cse.js?cx=' + cx, true);
}

module.exports = search;