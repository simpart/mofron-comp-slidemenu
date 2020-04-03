/**
 * @file mofron-comp-slidemenu/index.js
 * @brief slidemenu component for mofron
 * @license MIT
 */
const Menu     = require("mofron-comp-menu");
const Border   = require("mofron-effect-border");
const Focus    = require("mofron-event-clkfocus");
const Position = require("mofron-effect-position");
const cmputl   = mofron.util.component;

module.exports = class extends Menu {
    /**
     * initialize component
     * 
     * @param (mixed) item parameter
     *                dict: component config
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("SlideMenu");
            
            /* init config */
            this.confmng().add("position", { type: "string", select: ["left","right"], init: "left"});
            
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     *
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            
	    /* focus event */
            let fcs = (f1,f2) => {
	        try {
		    f1.visible(false);
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    }

            /* set default config */
            this.config({
                style: { "position": "fixed", "top": "0rem" },
		event: new Focus({ tag: "SlideMenu", listener: fcs, pointer: false }),
		effect: [
		    new Border(),
		    new Position({ tag: "SlideMenu", value: "0rem", eid: 0 }),
		    new Position({ tag: "SlideMenu", eid: 1 })
		],
		visible: false
	    });
            
	    /* display event */
	    let disp = (d1,d2,d3) => {
		if ("none" !== d2[0]) {
		    setTimeout(() => { d3.event({ name: "ClkFocus", tag: "SlideMenu" }).status(true); }, 50);
		}
	    }
	    this.styleDom().style().listener("display",disp,this);

	    /* add select event */
	    let sel = (s1,s2) => {
	        try {
                    s1.visible(false);
		    setTimeout(() => { s1.event({ name: "ClkFocus", tag: "SlideMenu" }).status(false); }, 50);
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    }
	    this.selectEvent(sel);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * init menu position
     * 
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            
	    /* set initial position */
            let pcnf = this.confmng("position");
            if ("left" === pcnf) {
                this.style({ "left" : "-" + this.width() });
	    } else {
                this.style({ "right" : "-" + this.width() });
	    }
            
	    /* set position value */
            this.effect({ name: "Position", tag: "SlideMenu", eid: 1 }).value("-" + this.width());
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set height
     * 
     * @type private
     */
    afterRender () {
        try {
            super.afterRender();
	    cmputl.size(this, "height", "100%");
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * menu position setter/getter
     * 
     * @param (string) left: slides from the left side [default]
     *                 right: slides from the right side
     * @return (string) menu position
     * @type parameter
     */
    position (prm) {
        try {
            let ret = this.confmng("position", prm);
            if (undefined !== prm) {
                this.effect({ name: "Position", tag: "SlideMenu", eid: 0 }).direction(prm);
		this.effect({ name: "Position", tag: "SlideMenu", eid: 1 }).direction(prm);
	    }
            return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * menu panel setter/getter
     * 
     * @param (mixed(color)) string: background color name, #hex
     *                       array: [red, green, blue, (alpha)]
     * @param (dict) style option
     * @type parameter
     */
    baseColor (prm, opt) {
        try {
            return cmputl.color(this, "background", prm, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
