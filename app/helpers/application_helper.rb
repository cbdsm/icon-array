module ApplicationHelper
  
  @@overlay_opacity = 1.0
  
  def link_to_active_if_current(text, path, options={})
    link_to_unless_current(text, path, options) do
		  link_to(text, path, options.merge(:class => 'active'))
		end
  end
  
  def icon(icon, color, height=45, width=nil)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = image_tag icon, :style => "#{css_width}height:#{height}px; background-color: #{color}", :class => 'overlay'
    # out = "<img src='#{url}/images/icons/#{icon_file}' style='#{css_width}height:#{height}px; background-color: #{color}' class='overlay' />"
		return out.html_safe
  end

  def icon_overlay_hack(icon, height=45, width=nil)
    css_width = width.blank? ? '' : "width: #{width}px; "
    # out = image_tag icon, :style => "height:#{height}px; margin-top: -#{height}px;", :class => 'picto-cell-icon'
    out = image_tag icon, :style => "height:#{height}px; width: #{width}px; margin-top: -#{height}px; display:inline-block;", :class => 'picto-cell-icon'
    return out.html_safe
  end

  def icon_overlay(icon, height=45, width=nil)
    css_width = width.blank? ? '' : "width: #{width}px; "
    # out = image_tag icon, :style => "height:#{height}px; margin-top: -#{height}px;", :class => 'picto-cell-icon'
    # out = image_tag icon, :style => "height:#{height}px; width: #{width}px; margin-top: -#{height}px; display:inline-block;", :class => 'picto-cell-icon'
    out = content_tag 'div', '', :class => 'picto-cell-icon', :style => "background:url(#{icon});  background-size: cover; -ms-behavior: url(/assets/backgroundsize.min.htc);height:100%; width: #{width}px; margin-top: -#{height}px; display:inline-block; float: left;"
    return out.html_safe
  end

  def icon_overlay_thousand_hack(icon, height=48, width=nil, spacing=2)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = ''
    for i in 1..4
      # out += image_tag icon, :style => "height:#{height}px; bottom: #{(i * height) + (i * spacing)}px; border-top: solid #ffffff #{spacing}px; position:absolute; top: auto; z-index:9999"
      out += image_tag icon, :class => 'picto-cell-icon', :style => "height:#{height}px; width: #{width}px; margin-top: -#{(i * height) + (i * spacing)}px; border-top: solid #ffffff #{spacing}px;"
    end
    return out.html_safe
  end

  def icon_overlay_thousand(icon, height=48, width=nil, spacing=2)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = "<div class=\"images\" style=\"float: left; height: #{height}px; margin-top: -#{height}px;\">"
    for i in 1..4
      out += content_tag 'div', ' ', :class => 'thousand picto-cell-icon', :style => "background:url(#{icon});  background-size: cover; -ms-behavior: url(/assets/backgroundsize.min.htc); width: #{width}px; border-top: solid #ffffff #{spacing}px;"
    end
    out += "</div>"
    return out.html_safe
  end

  def asset_url(asset)
    "http://www.iconarray.com#{asset_path(asset)}"
      # "#{request.protocol}#{request.host_with_port}#{asset_path(asset)}"
  end
  
  def box(color, height=45, width=nil)
    width ||= (height / 1.8).round
    return "<div class='box-icon' style='width:#{width}px; height: #{height}px; background-color: #{color};'></div>".html_safe
  end
  
  def hex2rgb(hex)
    rgb = Array.new
    hex = hex.gsub('#', '')
    rgb << hex[0..1].to_i(16)
    rgb << hex[2..3].to_i(16)
    rgb << hex[4..5].to_i(16)
    return rgb
  end

  # NOTE: this would be awesome, except for the width/height specs
  def html5_image_submit_tag(image, options={})
    style = options[:style] || ''
    style += "background-image:url(assets/#{image}); display: block; width: 59px; height: 59px; text-indent: -1999px; overflow: hidden; background-color:white; border: none;"
    options[:style] = style
    value = options[:value]
    options.delete(:value)
    submit_tag(value, options)
  end
  
end
