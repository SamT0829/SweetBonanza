interface IDictionary {
    add(key: any, value: any): void;
    remove(key: any): void;
    containsKey(key: any): boolean;
    keys(): any[];
    values(): any[];
}

class Dictionary {
    _keys: any[] = new Array();
    _values: any[] = new Array();

    public constructor(init: { key: any; value: any; }[]) {
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    public clear() {
        for (var key of this._keys) {
            delete this[key];
        }
        while (this._keys.length > 0 || this._values.length > 0) {
            this._keys.pop();
            this._values.pop();
        }

    }

    public insert(key: any, value: any) {
        this[key] = value;
        this._keys.insert(0,key);
        this._values.push(0,value);
    }

    public add(key: any, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    public parseJSON(json: string) {
        let obj: Dictionary = JSON.parse(json);
        this.parseObj(obj);
    }

    public parseObj(obj: Dictionary) {
        if (obj._keys !== null && obj._keys !== undefined) {
            for (let i = 0, imax = obj._keys.length; i < imax; ++i) {
                let key = obj._keys[i];
                let value = obj[key];
                this.add(key, value);
            }
        }
        else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var value = obj[key];
                    this.add(key, value);
                }
            }
        }
    }

    public remove(key: any) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    public keys(): any[] {
        return this._keys;
    }

    public values(): any[] {
        return this._values;
    }

    public containsKey(key: any) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    public get Count(): number {
        return this._keys.length;
    }

    public toLookup(): IDictionary {
        return this;
    }
}