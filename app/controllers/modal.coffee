Spine = require('spine')
Keys = require('utils/keys')

# The base Modal class
class Modal extends Spine.Controller

	state: off

	show: ->
		return unless @state is off
		@state = on
		@el.show(0).addClass("show")
		setTimeout ( =>
			@el.on "click.modal, touchend.modal", (event) =>
				if event.target.className.indexOf("modal") >= 0 then @hide()
		), 500

	hide: ->
		return unless @state is on
		@state = off
		@el.removeClass("show")
		setTimeout ( => @el.hide(0) ), 350
		@el.off("click.modal, touchend.modal")


# Used for deleting the current list
class TrashList extends Modal
	events:
		"click .true": "delete"
		"click .false": "close"

	run: =>
		if Setting.get "confirmDelete"
		  @show()
		else
		  @delete()

	delete: =>
		List.current.trigger("kill")
		@hide()

	close: =>
		@hide()


# Used for emailing a list
class EmailList extends Modal

	events:
		"click button": "submit"
		"keyup input": "keyup"

	keyup: (e) =>
		if e.keyCode is Keys.ENTER
			@submit()

	submit: =>
		console.log "submitted"


# Stores a reference to each modal, so we can fetch them from other files
modals = []

module.exports =

	# Return a modal
	get: (name) ->
		return modals[name]

	# Bind the modals
	init: ->

		modals["trash"] = new TrashList
			el: $(".modal.delete")

	  modals["email"] = new EmailList
	  	el: $(".modal.email")

	  modals["share"] = new Modal
	  	el: $(".modal.share")
