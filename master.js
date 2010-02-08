(function(){
  
  function byId(id) {
    return document.getElementById(id);
  }
  
  function escapeHTML(str) {
    return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  function getOptions() {
    return {
      shouldRemoveComments:             byId('remove-comments').checked,
      shouldCollapseWhitespace:         byId('collapse-whitespace').checked,
      shouldCollapseBooleanAttributes:  byId('collapse-boolean-attributes').checked,
      shouldRemoveAttributeQuotes:      byId('remove-attribute-quotes').checked,
      shouldRemoveRedundantAttributes:  byId('remove-redundant-attributes').checked,
      shouldUseShortDoctype:            byId('use-short-doctype').checked,
      shouldRemoveEmptyAttributes:      byId('remove-empty-attributes').checked
    };
  }
  
  function commify(str) {
    return String(str)
      .split('').reverse().join('')
      .replace(/(...)(?!$)/g, '$1,')
      .split('').reverse().join('');
  }
  
  byId('convert-btn').onclick = function() {
    try {
      var originalValue = byId('input').value,
          minifiedValue = minify(originalValue, getOptions()),
          diff = originalValue.length - minifiedValue.length,
          savings = originalValue.length ? ((100 * diff) / originalValue.length).toFixed(2) : 0;

      byId('output').value = minifiedValue;

      byId('stats').innerHTML = 
        '<span class="success">' +
          'Original size: <strong>' + commify(originalValue.length) + '</strong>' +
          '. Minified size: <strong>' + commify(minifiedValue.length) + '</strong>' +
          '. Savings: <strong>' + commify(diff) + ' (' + savings + '%)</strong>.' +
        '</span>';
    }
    catch(err) {
      byId('output').value = '';
      byId('stats').innerHTML = '<span class="failure">' + escapeHTML(err) + '</span>';
    }
  };
  
})();