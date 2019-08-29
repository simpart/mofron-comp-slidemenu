/**
 * @file mofron-comp-slidemenu/index.js
 * @brief slide menu component for mofron
 * @author simpart
 */
const mf = require("mofron");
const Focus = require("mofron-event-clkfocus");
const Position = require("mofron-effect-position");
const Border = require("mofron-effect-border");
const HrzPos = require("mofron-effect-hrzpos");
const SynWid = require("mofron-effect-syncwid");
const Click = require("mofron-event-click");
const Menu = require("mofron-comp-menu");
const Text = require("mofron-comp-text");


let sm_open   = new Position({ eid: 0, direction: "left", tag: "SlideMenu-open"  });
let sm_close  = new Position({ eid: 1, direction: "left", tag: "SlideMenu-close" });
let sm_border = new Border({ type: "right", tag: "SlideMenu", color: [190,190,190] });

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
            this.switch(new Text({ text: '&equiv;', size: '0.4rem' }));
            
            let sd   = this;
            let mwrp = new mf.Component({
                style: { "position":"fixed", "top" : "0rem" },
                effect: [
                    sm_border, sm_open, sm_close,
                    new SynWid({ targetComp: this.menu(), tag: "SlideMenu" })
                ],
                event: [
                    new Click({
                       handler: () => {
                           try {
                               sd.slidemng(true);
                               let fcs = sd.switch().event("ClkFocus").clickFlag();
                               if (false === fcs) {
                                   sd.switch().event("ClkFocus").clickFlag(true);
                               } else {
                                   sd.slidemng(null);
                               }
                           } catch (e) {
                               console.error(e.stack);
                               throw e;
                           }
                       },
                       pointer: false
                    })
                ],
                height: "100%", child: this.menu(), visible: false, 
            });
            
            this.child([this.switch().parent(), mwrp]);
            
            this.target(this.menu().target());
            this.styleTgt(this.target());
            this.eventTgt(this.target());
            
            this.width("2rem");
            this.baseColor([255,255,255]);
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
            sm_open.value("-" + this.width(), "0rem");
            sm_close.value("0rem", "-" + this.width());
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
            if (undefined === prm) {
                return this.innerComp("switch").child()[0];
            }
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
            this.innerComp("switch", prm, mf.Component);
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
                sm_border.type(("left" === this.position()) ? "right" : "left");
                let sd = this;
                prm.option({
                    selectEvent: () => {
                        setTimeout(
                            () => {
                                sd.slidemng(false);
                                sd.switch().event("ClkFocus").focusSts(false);
                            },
                            80
                        );
                    },
                });
                
                if (undefined !== this.innerComp()["menu"]) {
                    /* it is overwrite menu */
                    /* set color */
                    prm.option({
                       baseColor: this.mainColor(),
                       accentColor: this.accentColor(),
                    });
                    /* replace sync target */
                    this.menu().parent().effect(["SyncWid", "SlideMenu"]).targetComp(prm);
                    /* replace target */
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
                if ( (false === prm) || (prm !== this.menu().parent().visible())) {
                    this.menu().parent().visible(prm);
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
                this.switch().parent().effect(["HrzPos","SlideMenu"]).type(prm);
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
     * @param (mixed (color)) string: color name, #hex
     *                        array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu item background color
     * @type parameter
     */
    mainColor (prm, opt) {
        try { return this.menu().baseColor(prm, opt); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * background color of menu
     *
     * @param (mixed (color)) string: color name, #hex
     *                        array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu background color
     * @type parameter
     */
    baseColor (prm, opt) {
        try {
            return mf.func.cmpColor(this.menu().parent(), "background", [prm,opt]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * accent color of menu item
     * 
     * @param (mixed (color)) string: color name, #hex
     *                        array: [red, green, blue, (alpha)]
     * @param (option) style option
     * @return (string) menu item accent color
     * @type parameter
     */
    accentColor (prm, opt) {
        try { return this.menu().accentColor(prm,opt); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.SlideMenu;
/* end of file */
