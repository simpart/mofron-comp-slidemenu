/**
 * @file   mofron-comp-slidemenu/index.js
 * @author simpart
 */
let mf = require('mofron');
let Focus = require('mofron-event-focus');
let Posit = require('mofron-effect-position');
let Menu = require('mofron-comp-menu');

/**
 * @class mofron.comp.SlideMenu
 * @brief slide-menu component for mofron
 */
mofron.comp.SlideMenu = class extends Menu {
    
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
     * initialize vdom
     * 
     * @param prm : (string) text contents
     */
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.target().style({'height' : '100%',});
            
            /* menu switch */
            this.addChild(new mf.Component(), undefined, false);

            /* contents */
            let posit = new Posit({
                type      : ['relative', 'left'],
                defStatus : false
            });
            let conts = new mf.Component({
                height    : '100%',
                style     : {
                    'border-right' : 'solid 1px rgb(190,190,190)'
                },
                addChild  : new mf.Component({  /* offset */
                    style : {'margin-top' : '1px'}
                }),
                addEffect : posit
            });
            this.addChild(conts, undefined, false);
            this.target(conts.target());
            this.width(250);

            posit.value([
                ('number' === typeof this.width()) ? (0 - this.width()) : '-'+this.width(),
                0
            ]);
            
            this.color(new mf.Color(255,255,255));
            
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_height) ? null : this.m_height;
            }
            /* setter */
            if ( ('number' !== typeof prm) && ('string' !== typeof prm) ) {
                throw new Error('invalid parameter');
            }
            this.m_height = prm;
            this.setMenuConf();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMenuConf (cmp) {
        try {
            if (undefined === cmp) {
                /* set all contents */
                let chd = this.child()[1].child();
                for (let cidx in chd) {
                    if (0 === cidx) {
                        continue;
                    }
                    super.setMenuConf(chd[cidx]);
                }
            } else {
                super.setMenuConf(cmp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    switch (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.child()[0].child();
            }
            let sld = this;
            prm.addEvent(
                new Focus(
                    (flg, tgt) => {
                        try {
                            let pos = sld.child()[1].getConfig('effect', 'Position');
                            if (null !== pos) {
                                pos.speed(0.2);
                                pos.execute(flg);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                )
            );
            
            if ('number' === typeof prm.height()) {
                this.child()[1].style({
                    'position' : 'relative',
                    'top'      : '-' + prm.height() + 'px'
                });
            }
            
            this.child()[0].addChild(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    offset (prm) {
        try {
            let off = this.child()[1].child()[0];
            if (undefined === prm) {
                /* getter */
                return mf.func.getLength(
                    off.style('top')
                );
            }
            /* setter */
            off.size(this.width(), prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    zIndex (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.style('z-index');
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            
            this.style({
                'z-index' : prm
            });
            
            let idx_cmp = this.switch();
            if (0 < idx_cmp.length) {
                for (let iidx in idx_cmp) {
                    idx_cmp[iidx].style({
                        'position' : 'relative',
                        'z-index'  : prm
                    });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.SlideMenu;
/* end of file */
