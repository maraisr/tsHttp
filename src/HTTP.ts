export module HTTP {
    var base:string,
		_config:ClientConfig;

	interface ClientConfig {
		params?:Object;
	}

    export class Client {
        constructor(nBase:string, config?:ClientConfig) {
            base = nBase;
			_config = config;
        }

        public get(ep:string, params:Object = void {}):Promise<Response> {
            return (new Request('GET', {base: base, ep: ep, params: params})).send();
        }
    }

    interface RequestConfig {
        base?: string;
        ep: string;
        params?: Object;
    }

    export class Request {
        private r:XMLHttpRequest;
        private url:RequestConfig;
        method:string;

        constructor(method:string, url:RequestConfig) {
            this.method = method;
            this.url = url;

            if (this.url.base == void 0 && base != void 0) {
                this.url.base = base;
            }

            this.r = new XMLHttpRequest();
        }

        static enParam(params:Object, prefix:string = ''):string {
            var r:Array<any> = new Array();

            for (var p in params) {
                var k:string = ((prefix != '') ? (prefix + '[' + p + ']') : p),
                    v:any = params[p];

                if (!(v == null || typeof v == void 0)) {
                    r.push((typeof v == 'object') ? Request.enParam(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
                }
            }

            return r.join('&');
        }

        static buildQuery(base:string, ep:string, params:Object):string {
            return base.replace(/\/+$/, '') + '/' + ep.replace(/^\/+/, '') + (params == void {} ? '' : '?' + Request.enParam(params));
        }

        send():Promise<Response> {
            return new Promise((resolve, reject) => {
                this.r.open(this.method, Request.buildQuery(this.url.base, this.url.ep, this.url.params), true);
                this.r.setRequestHeader('Accept', 'application/json');
                this.r.send(null);

                this.r.addEventListener('readystatechange', () => {
                    if (this.r.readyState == this.r.DONE) {
                        resolve(new Response(this.r));
                    }
                });
            })
        }
    }

    class Response {
        private response:any;
        private isJson:boolean = false;
        json:Object = void 0;
        statusCode:number;

        constructor(r:XMLHttpRequest) {
            this.response = r.responseText;

            this.statusCode = r.status;

            try {
                this.isJson = true;
                this.json = JSON.parse(this.response);
            } catch (e) {
            }
        }
    }

    export class Pool {
        client:Client;
        requests:Array<Request>;

        constructor(client:Client, requests:Array<Request>) {
            this.client = client;
            this.requests = requests;
        }

        send(cb:(response:Response, index:number) =>  any):void {
            for (let i:number = 0; i < this.requests.length; i++) {
                this.requests[i].send().then((response:Response) => {
                    cb(response, i);
                });
            }
        }
    }
}
