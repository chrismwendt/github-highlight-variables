var highlight = variableName => {
  //console.log('highlight', variableName);
  return $('span')
    .filter(function() {
      return $(this).text() === variableName;
    }).each((_index, element) => {
      //console.log('match', element, variableName);
      $(element).css('background-color', 'lightgrey');
    }).toArray();
};

var wrapWordsInSpans = () => {
  $('.highlight > pre, .blob-code').each(function() {
    $(this)
      .contents()
      .filter(function() { return this.nodeType === Node.TEXT_NODE; })
      .each(function() { $(this).replaceWith(this.nodeValue.replace(/\b(\w+)\b/g, "<span>$1</span>")); });
  });
};

var unhighlight = highlightedElements => {
  //console.log('Unhighlighting', highlightedElements.length);
  highlightedElements.forEach(e => {
    $(e).css('background-color', '');
  });
};

var main = () => {
  wrapWordsInSpans();

  var highlightedElements = [];

  $('.highlight > pre span, .blob-code span').hover(function() {
    unhighlight(highlightedElements);
    //console.log(e.target, e.pageX, e.pageY, e, getWordAtPoint(e.target, e.pageX, e.pageY));
    //console.log('hover on', $(this).text());
    var variableName = $(this).text();
    if (variableName && variableName.trim().length > 0) {
      highlightedElements = highlight(variableName);
      //console.log('highlighted',highlightedElements.length);
    }
  }, () => unhighlight(highlightedElements));
}
$(document).ready(main);
$(document).on('pjax:end', main);
//$(document).on('pjax:start', () => unhighlight());
