;
(function(ns, win) {
    var emptyString = '';
    var searchPrefix = '?';
    var searchSplitor = '&';
    var searchKeyValueSplitor = '=';
    var searchPrefixRex = new RegExp('^\\' + searchPrefix);

    class dataTransfer {
        constructor(scope) {
            this.parent = scope;
        }

        getSearchData(key = null) {
            var location = win.location;

            var searchObj = getSearchObj(location.search);

            return key ?
                searchObj[key] :
                searchObj;
        }

        setSearchData(data) {
            var location = win.location;

            var searchObj = getSearchObj(location.search);
            searchObj = Object.assign(searchObj, data);

            var newSearchStr = createSearchString(searchObj);

            var newUrl = [
                location.origin,
                location.pathname,
                newSearchStr,
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
        var keyValues = searchStr.split(searchSplitor)
            .filter(function(kv) {
                return kv;
            });

        var searchObj = Object.create(null);

        _.each(keyValues, function(kv) {
            var kvArr = kv.split(searchKeyValueSplitor);
            searchObj[kvArr[0]] = kvArr[1];
        });

        return searchObj;
    }

    function createSearchString(obj) {
        var keyValueArray = _.toPairs(obj);

        keyValueArray = keyValueArray.map(function(keyValue) {
            return keyValue.join(searchKeyValueSplitor);
        });

        return searchPrefix + keyValueArray.join(searchSplitor);
    }

})(window, window); // 建议此处传入自己的名称空间
