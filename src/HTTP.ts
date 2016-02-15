export module HTTP {
	export class Req {
		private base:string;
		private r:XMLHttpRequest;

		constructor(base:string) {
			this.base = base;
			this.r = new XMLHttpRequest();
		}

		static enParam(params:Object, prefix:string=''):string {
			var r:Array<any> = new Array();

			for(var p in params) {
				var k:string = ((prefix != '') ? (prefix+ '['+p+']') : p),
					v:any = params[p];

					if (!(v == null || typeof v == void 0)) {
						r.push((typeof v == 'object') ? Req.enParam(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
					}
			}

			return r.join('&');
		}

		static buildQuery(base:string, ep:string, params:Object):string {
			return base.replace(/\/+$/, '')+'/'+ep.replace(/^\/+/, '')+(params == void {} ? '' : '?'+Req.enParam(params));
		}

		public get(ep:string, params:Object = void {}):Promise<Response> {
			return new Promise((resolve) => {
				this.r.open('GET', Req.buildQuery(this.base, ep, params), true);
				this.r.setRequestHeader('Accept', 'application/json');
				this.r.send(null);

				this.r.addEventListener('readystatechange', () => {
					if (this.r.readyState == this.r.DONE) {
						resolve(new Response(this.r));
					}
				});
			});
		}
	}

	class Response {
		private response:any;
		private isJson:boolean = false;

		constructor(r:XMLHttpRequest) {
			this.response = r.responseText;

			try {
				if (r.getResponseHeader('Content-Type') == 'application/json') {
					this.isJson = true;
				}
			} catch (e) {}
		}

		get payload():any {
			if (this.isJson) {
				return JSON.parse(this.response);
			}

			return this.response;
		}
	}
}
