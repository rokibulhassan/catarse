window.c.AdminDetail = (function(m, c){
  return {
    controller: function(){
      return {
        displayRequestRefundDropDown: c.ToggleDiv.toggler(),
        displayRefundDropDown: c.ToggleDiv.toggler(),
        displayTransferContributionDropDown: c.ToggleDiv.toggler(),
        displayChangeRewardDropDown: c.ToggleDiv.toggler(),
        displatAnonDropDown: c.ToggleDiv.toggler()
      };
    },

    view: function(ctrl, args){
      var contribution = args.item;
      return m('#admin-contribution-detail-box', [
        m('.divider.u-margintop-20.u-marginbottom-20'),
        m('.w-row.u-marginbottom-30.w-hidden',[
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary', {
              onclick: ctrl.displayRequestRefundDropDown.toggle
            }, 'Pedir reembolso'),
            m.component(c.ToggleDiv, {
              display: ctrl.displayRequestRefundDropDown,
              content:
                m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[id="transfer"]',   [
                m('.fontsize-smaller.fontweight-semibold.u-text-center.u-marginbottom-20', 'Quer efetuar o reembolso?'),
                m('button.btn.btn-small', 'Solicitar reembolso')
              ])
            })
          ]),
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary', {
              onclick: ctrl.displayRefundDropDown.toggle
            }, 'Estornar'),
            m.component(c.ToggleDiv, {
              display: ctrl.displayRefundDropDown, content:
              m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10', [
                m('.fontsize-smaller.fontweight-semibold.u-text-center.u-marginbottom-20', 'Quer efetuar o estorno?'),
                m('button.btn.btn-small', 'Solicitar estorno')
              ])
            })
          ]),
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary.btn-desactivated', '2a via')
          ]),
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary', {
              onclick: ctrl.displayTransferContributionDropDown.toggle
            }, 'Transferir apoio'),
            m.component(c.ToggleDiv, {
              display: ctrl.displayTransferContributionDropDown,
              content:
                m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10',[
                  m('.w-form',[
                    m('form',[
                      m('label', 'Id do novo apoiador:'),
                      m('input.w-input.text-field[placeholder="ex: 129908"][type="text"]'),
                      m('input.w-button.btn.btn-small[type="submit"][value="Transferir"]')
                    ])
                  ])
                ])
            })
          ]),
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary', {
              onclick: ctrl.displayChangeRewardDropDown.toggle
            }, 'Trocar recompensa'),
            m.component(c.ToggleDiv, {
              display: ctrl.displayChangeRewardDropDown,
              content:
                m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10[id="transfer"]', {
                  style: {
                    'display': 'none'
                  }
                },[
                  m('.w-form',[
                    m('form',[
                      m('.w-radio',[
                        m('input.w-radio-input[type="radio"][value="Radio"]'),
                        m('label.w-form-label', 'R$ 10')
                      ]),
                      m('.w-radio',[
                        m('input.w-radio-input[type="radio"][value="Radio"]'),
                        m('label.w-form-label[for="radio"]', 'R$ 10')]),
                        m('.w-radio',[
                          m('input.w-radio-input[type="radio"][value="Radio"]'),
                          m('label.w-form-label', 'R$ 10')
                        ]),
                        m('.w-radio',[
                          m('input.w-radio-input[type="radio"][value="Radio"]'),
                          m('label.w-form-label', 'R$ 10')
                        ]),
                        m('.w-radio',[
                          m('input.w-radio-input[type="radio"][value="Radio"]'),
                          m('label.w-form-label', 'R$ 10')
                        ])
                    ])
                  ])
                ])
            })
          ]),
          m('.w-col.w-col-2',[
            m('button.btn.btn-small.btn-terciary', {
              onclick: ctrl.displatAnonDropDown.toggle
            }, 'Anonimato'),
            m.component(c.ToggleDiv, {
              display: ctrl.displatAnonDropDown,
              content:
              m('.dropdown-list.card.u-radius.dropdown-list-medium.zindex-10', [
                m('.w-form',[
                  m('form',[
                    m('.w-radio',[
                      m('input.w-radio-input[type="radio"]'),
                      m('label.w-form-label', 'Anônimo')
                    ]),
                    m('.w-radio',[
                      m('input.w-radio-input[type="radio"][value="Radio"]'),
                      m('label.w-form-label', 'Público')
                    ])
                  ])
                ])
              ])
            })
          ])
        ]),
        m('.w-row.card.card-terciary.u-radius',[
          m.component(c.AdminTransaction, {contribution: contribution}),
          m.component(c.AdminTransactionHistory, {contribution: contribution}),
          m.component(c.AdminReward, {contribution: contribution, key: contribution.key})
        ])
      ]);
    }
  };
}(window.m, window.c));
