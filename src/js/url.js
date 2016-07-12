;
(function(ns, doc) {
    doc = doc || window.document;

    var emptyString = '';
    var searchPrefix = '?';
    var searchSplitor = '&';
    var searchKeyValueSplitor = '=';
    var searchPrefixRex = new RegExp('^\\' + searchPrefix);
    var a = $ ?
        $('<a></a>').get(0) :
        doc.createElement('a');

    class Url {
        constructor(url) {
            this._url = url;
            Object.assign(this, parseUrl(this._url));
        }

        getSearchData(key = null) {
            var searchObj = getSearchObj(this.search);

            return key ?
                searchObj[key] :
                searchObj;
        }

        updateSearchData(data) {
            var searchObj = getSearchObj(this.search);
            searchObj = Object.assign(searchObj, data);
            this.search = createSearchStr(searchObj);
        }

        setSearchData(data) {
            this.search = createSearchStr(data);
        }

        getUrl() {
            return [
                this.origin,
                this.pathname,
                this.search,
                this.hash
            ].join(emptyString);
        }

    }

    if(!ns.Url) {
        ns.Url = Url;
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

    function parseUrl(url) {
        a.href = url;

        return {
            origin: a.origin,
            pathname: a.pathname,
            search: a.search,
            hash: a.hash,
        };
    }

    function createSearchStr(obj) {
        var keyValueArray = _.toPairs(obj);

        keyValueArray = keyValueArray.map(function(keyValue) {
            return keyValue.join(searchKeyValueSplitor);
        });

        return searchPrefix + keyValueArray.join(searchSplitor);
    }


})(window, document);
