/**
 * Extractor module
 * Based on @PaulKinlan critical css parser (https://gist.github.com/PaulKinlan/6283739)
 */

module.exports = function() {
    
    var w = window;
    var d = document;
    var css = {};
    var cssData = [];
    
    // The last selector wins, so over-write
    // merging existing css will happen here...
    var pushCSS = function(r) {
        css[r.selectorText] = r.cssText; 
    };

    // Get a list of all the elements in the view.
    var height = w.innerHeight;
    var walker = d.createTreeWalker(d.body, NodeFilter.SHOW_ELEMENT, function(node) { return NodeFilter.FILTER_ACCEPT; }, true);

    while(walker.nextNode()) {
        var node = walker.currentNode;
        var rect = node.getBoundingClientRect();
        if(rect.top < height) {
            // element is in the first scroll of the screen
            var rules = w.getMatchedCSSRules(node);
            if(!!rules) {
                for(var r = 0; r < rules.length; r++) {
                    pushCSS(rules[r]); 
                }
            }
        } 
    }
    
    var orderStart = 1;
    
    for (var k in css) {
        cssData.push({key: k, order: orderStart, value: css[k]});
        orderStart++;
    }

    return cssData;
}