export module HTTP {
	export class Req {
		private base:string;

		constructor(base:string) {
			this.base = base;
		}

		public Get(ep:string) {
			return this.base+ep;
		}
	}
}
