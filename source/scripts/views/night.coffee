Base = require 'base'
Setting = require '../models/setting'
delay = require '../utils/timer'

DELAY = 1000 * 60 * 60 * 12 # 12 hours
MORNING = 7
NIGHT = MORNING + 12

class NightMode extends Base.View

  el: 'html'

  constructor: ->
    super

    @listen Setting,
      'change:night': @toggle

    @toggle Setting.night

  toggle: (value) =>
    now = new Date()
    hours = now.getHours()

    if value is 'auto'
      nextRun = new Date()
      nextRun.setMinutes 0

      # turn it off at 7am tomorrow
      if hours > NIGHT
        nextRun.setHours MORNING
        nextRun.setDate nextRun.getDate()+1

      # turn it off at 7am today
      else if hours < MORNING
        nextRun.setHours MORNING

      # turn it off 7pm today
      else
        # turn it off 7pm today
        nextRun.setHours NIGHT

      delay nextRun.getTime() - now.getTime(), =>
        @el.toggleClass 'dark'
        delay DELAY, =>
          @el.toggleClass 'dark'

    if (value is 'dark') or
    (value is 'auto' and (hours > NIGHT or hours < MORNING))
      @el.addClass 'dark'

    else if value is 'light'
      @el.removeClass 'dark'

module.exports = NightMode
