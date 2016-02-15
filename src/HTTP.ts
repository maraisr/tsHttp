export module HTTP {
	export class Req {
		private base:string;
		private r:XMLHttpRequest;

		constructor(base:string) {
			this.base = base;
			this.r = new XMLHttpRequest();
		}

		static buildQuery(base:string, ep:string, params:Object):string {
			return base.replace(/\/+$/, '')+'/'+ep.replace(/^\/+/, '');
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
