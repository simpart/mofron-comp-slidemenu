/**
 * @file   mofron-comp-slidemenu/index.js
 * @author simpart
 */
require('mofron-comp-menu');
require('mofron-effect-position');
require('mofron-event-focus');

/**
 * @class mofron.comp.SlideMenu
 * @brief slide-menu component for mofron
 */
mofron.comp.SlideMenu = class extends mofron.comp.Menu {
    
    constructor (prm_opt) {
        try {
            super();
            this.name('SlideMenu');
            this.prmOpt(prm_opt);
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
            let simb  = new mofron.Dom('div', this);
            let conts = new mofron.Dom('div', this);
            this.vdom().child([ simb, conts ]);
            
            /* set simbol */
            this.target(simb);
            this.addChild(this.simbol());
            
            /* set contents config */
            this.target(conts);
            this.styleTgt(conts);
            this.style({
                height   : '100%',
                width    : this.elemSize()[0] + 'px'
            });
            this.addEffect(
                this.posEffect(),
                false
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    posEffect () {
        try {
            if (undefined === this.m_poseff) {
                this.m_poseff = new mofron.effect.Position({
                    speed      : 0.6,
                    disableVal : new mofron.Param('left', '-' + this.elemSize()[0] + 'px'),
                    enableVal  : new mofron.Param('left', 0)
                });
            }
            return this.m_poseff;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    simbol (smb) {
        try {
            if (undefined === smb) {
                /* getter */
                if (undefined === this.m_simbol) {
                    this.simbol(new mofron.Component());
                }
                return this.m_simbol;
            }
            /* setter */
            if (false === mofron.func.isInclude(smb, 'Component')) {
                throw new Error('invalid parameter');
            }
            if (undefined !== this.m_simbol) {
                this.updChild(
                    this.m_simbol,
                    smb
                );
            }
            smb.addEvent(
                new mofron.event.Focus(
                    (flg, tgt, prm) => {
                        try {
                            prm.execute(flg);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    this.posEffect()
                )
            );
            this.m_simbol = smb;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    elemSize (x, y) {
        try {
            let ret = super.elemSize(x, y);
            if (undefined === ret) {
                if ('number' !== typeof x) {
                    throw new Error('invalid parameter');
                }
                this.style({
                    left     : '-' + x + 'px'
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSizeComp (cmp) {
        try {
            if (this.child()[0].getId() === cmp.getId()) {
                return;
            }
            super.setSizeComp(cmp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getClickEvent () {
        try {
            if (1 === this.child().length) {
                return new mofron.event.Click();
            }
            return super.getClickEvent();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectIdx (idx, evt) {
        try {
            let ret = super.selectIdx(idx, evt);
            if (undefined !== ret) {
                return ret - 1;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.slidemenu = {};
module.exports = mofron.comp.SlideMenu;
