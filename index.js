/**
 * @file mofron-comp-slidemenu/index.js
 * @brief slide menu component for mofron
 * @author simpart
 */
const mf = require('mofron');
const Focus = require('mofron-event-clkfocus');
const Position = require('mofron-effect-position');
const Border = require('mofron-effect-border');
const HrzPos = require('mofron-effect-hrzpos');
const Click = require('mofron-event-click');
const Menu = require('mofron-comp-menu');
const Text = require('mofron-comp-text');

let sm_open   = new Position({ eid: 0, tag: "SlideMenu-open"  });
let sm_close  = new Position({ eid: 1, tag: "SlideMenu-close" });
let sm_border = new Border({ tag: "SlideMenu", color: [190,190,190] });

mofron.comp.SlideMenu = class extends mf.Component {
    /**
     * initialize component
     *
     * @type private
     */
    constructor (po) {
        try {
            super();
            this.name('SlideMenu');
            this.prmOpt(po);
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
            this.style({ "display" : "flex" });
            
            /* set default switch */
            this.switch(
                new Text({ text: '&equiv;', size: '0.4rem' })
            );
            this.child([this.switch(), this.menu()]);
            
            this.target(this.menu().target());
            this.styleTgt(this.target());
            this.eventTgt(this.target());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set height, color
     *
     * @type private
     */
    beforeRender () {
        try {
            super.beforeRender();
            this.style({ "height" : "100%" });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * switch component
     * it displays menu if the switch is clicked
     *
     * @param (component) switch component
     * @return (component) switch component
     * @type parameter
     */
    switch (prm) {
        try {
            if (true === mf.func.isComp(prm)) {
                let sd = this;
                prm.event(new Focus(
                    (p1,p2) => {
                        try { setTimeout(() => { sd.slidemng(p2); }, 50); } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                ));
                prm = new mf.Component({
                          effect: [
                              new HrzPos({
                                  type: this.position(), offset: "0.2rem", tag: "SlideMenu"
                              })
                          ],
                          style:{ "display":"flex" }, child: prm
                      });
            }
            return this.innerComp("switch", prm, mf.Component);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu component
     *
     * @param (component) menu component
     * @return (component) menu component
     * @type parameter
     */
    menu (prm) {
        try {
            if (true === mf.func.isComp(prm, "Menu")) {
                /* set effect option */
                sm_open.direction(this.position());
                sm_close.direction(this.position());
                sm_border.type(("left" === this.position()) ? "right" : "left");
                prm.option({
                    effect: [ sm_border, sm_open, sm_close ],
                    style: { "position":"fixed", "top" : "0rem" },
                    visible: false
                });
                /* set color */
                if (undefined !== this.innerComp()["menu"]) {
                    prm.option({
                       baseColor: this.mainColor(),
                       accentColor: this.accentColor(),
                    });
                    let bs_clr = this.baseColor();
                    if (undefined !== bs_clr) {
                        prm.style({ background: bs_clr[0] }, bs_clr[1]);
                    }
                }
                /* set slide width */
                let wid = (null !== prm.width()) ? prm.width() : this.width();
                if (null === wid) {
                    wid = "2rem";
                }
                sm_open.value("-" + wid, "0rem");
                sm_close.value("0rem", "-" + wid);
                
                /* set slide action */
                let sd = this;
                prm.event(
                    new Click({
                        handler: () => {
                            sd.slidemng(true);
                            let fcs = sd.switch().child()[0].event("ClkFocus").clickFlag();
                            if (false === fcs) {
                                sd.switch().child()[0].event("ClkFocus").clickFlag(true);
                            } else {
                                sd.slidemng(null);
                            }
                        },
                        pointer: false
                    })
                );
                prm.selectEvent(() => {
                    setTimeout(
                        () => {
                            sd.slidemng(false);
                            sd.switch().child()[0].event("ClkFocus").focusSts(false);
                        },
                        80
                    );
                });
                /* set default background */
                prm.style(
                    { "background": "rgb(255,255,255)" },
                    { loose:true }
                );
                /* replace target */
                if (undefined !== this.innerComp()["menu"]){
                    this.target(prm.target());
                    this.styleTgt(prm.target());
                    this.eventTgt(prm.target());
                }
            }
            return this.innerComp("menu", prm, Menu);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * menu items
     *
     * @param (array) menu item components
     * @return (array) menu item components
     * @type parameter
     */
    item (prm) {
        try { return this.menu().item(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * slide action manager
     *
     * @type private
     */
    slidemng (prm) {
        try {
            if ( ('boolean' === typeof prm) && (null !== this.slidemng()) ) {
                if ( (false === prm) || (prm !== this.menu().visible())) {
                    this.menu().visible(prm);
                }
            }
            return this.member("slidemng", "boolean", prm, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * position type
     *
     * @param (string) position type ["left","right"]
     * @return (string) position type
     * @type parameter
     */
    position (prm) {
        try {
            if (undefined !== prm) {
                /* set switch position */
                this.switch().effect(["HrzPos","SlideMenu"]).type(prm);
                /* set menu position */
                sm_open.direction(prm);
                sm_close.direction(prm);
                sm_border.type(("left" !== prm) ? "left" : "right");
            }
            return this.member("position", ["left","right"], prm, "left");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background color of menu items
     *
     * @param (string/array) string: color name, #hex
     *                       array: [r,g,b,[a]]
     *                       array: [color string, option]
     * @return (string) color name, #hex
     * @type parameter
     */
    mainColor (prm) {
        try { return this.menu().baseColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background color of menu
     *
     * @param (string/array) string: color name, #hex
     *                       array: [r,g,b,[a]]
     *                       array: [color string, option]
     * @return (string) color name, #hex
     * @type parameter
     */
    baseColor (prm) {
        try {
            if (undefined === prm) {
                return this.m_bsclr;
            }
            this.m_bsclr = ("string" === typeof prm) ? [prm, undefined] : prm;
            this.menu().tgtColor('background', this.m_bsclr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * accent color of menu item
     *
     * @param (string/array) string: color name, #hex
     *                       array: [r,g,b,[a]]
     *                       array: [color string, option]
     * @return (string) color name, #hex
     * @type parameter
     */
    accentColor (prm) {
        try { return this.menu().accentColor(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.SlideMenu;
/* end of file */
