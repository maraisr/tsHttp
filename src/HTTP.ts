export module HTTP {
	export class Req {
		private base:string;
		private r:XMLHttpRequest;

		constructor(base:string) {
			this.base = base;
			this.r = new XMLHttpRequest();
		}

		public get(ep:string):Promise<Response> {
			return new Promise((resolve) => {
				this.r.open('GET', this.base+ep, true);
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
