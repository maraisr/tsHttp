export module HTTP {
	export class Client {
		private base:string;

		constructor(base:string) {
			this.base = base;
		}

		public get(ep:string, params:Object = void {}):Promise<Response> {
			return (new Request('GET', {base: this.base, ep: ep, params:params})).send();
		}
	}

	interface RequestConfig {
		base: string;
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
			this.r = new XMLHttpRequest();
		}

		static enParam(params:Object, prefix:string=''):string {
			var r:Array<any> = new Array();

			for(var p in params) {
				var k:string = ((prefix != '') ? (prefix+ '['+p+']') : p),
					v:any = params[p];

					if (!(v == null || typeof v == void 0)) {
						r.push((typeof v == 'object') ? Request.enParam(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
					}
			}

			return r.join('&');
		}

		static buildQuery(base:string, ep:string, params:Object):string {
			return base.replace(/\/+$/, '')+'/'+ep.replace(/^\/+/, '')+(params == void {} ? '' : '?'+Request.enParam(params));
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
}
