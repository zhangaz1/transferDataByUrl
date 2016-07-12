;
(function(ns, win) {
    var emptyString = '';
    var searchPrefix = '?';
    var searchSplitor = '&';
    var keyValueSplitor = '=';
    var searchPrefixRex = new RegExp('^\\' + searchPrefix);

    class dataTransfer {
        constructor(scope) {
            this.parent = scope;
        }

        getDomainId() {

        }

        setDomainId(domainId) {
            var location = win.location;

            var oldSearch = location.search;
            var newSearch = '?domainId=' + domainId;

            var newUrl = [
                location.origin,
                location.pathname,
                searchPrefix,
                newSearch,
                location.hash
            ].join(emptyString);

            history.pushState(null, win.title, newUrl);
        }
    }

    if(!ns.dataTransfer) {
        ns.dataTransfer = new dataTransfer(ns);
    }

    return void(0);

    function getSearchObj(searchStr) {
        searchStr = searchStr.replace(searchPrefixRex, emptyString);
        var keyValues = searchStr.split(searchSplitor);

        var searchObj = Object.create(null);
        return searchObj;
    }

})(window, window); // 建议此处传入自己的名称空间
