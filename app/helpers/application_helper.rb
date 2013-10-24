module ApplicationHelper
  
  @@overlay_opacity = 1.0
  
  def link_to_active_if_current(text, path, options={})
    link_to_unless_current(text, path, options) do
		  link_to(text, path, options.merge(:class => 'active'))
		end
  end
  
  def icon(this_icon, color, height=45, width=nil, border=true)
    css_width = width.blank? ? '' : "width: #{width}px; "

    out = "<div style='position: relative; #{css_width}height:#{height}px;'>"
    out += content_tag 'div', '', :class => 'overlay', :style => "background:url(#{this_icon});  background-size: cover; -ms-behavior: url(/assets/backgroundsize.min.htc); #{css_width}height:#{height}px; background-color: #{color}"
    unless border === false
    out += '<div style="width: 2px; position:absolute; left: -1px; bottom: 0px; height: 100%; background-color: white;"></div>
        <div style="width: 2px; position:absolute; right: -1px; bottom: 0px; height: 100%; background-color: white;"></div>
        <div style="width:100%; position:absolute; top: -1px; height: 2px; left: 0px; background-color: white;"></div>
        <div style="width:100%; position:absolute; bottom: -1px; left: 0px; height: 2px; background-color: white;"></div>'.html_safe
    end
    out += "</div>"
		return out.html_safe
  end

  def icon_overlay(this_icon, height=45, width=nil)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = content_tag 'div', '', :class => 'picto-cell-icon', :style => "background:url(#{this_icon});  background-size: cover; -ms-behavior: url(/assets/backgroundsize.min.htc);height:100%; width: #{width}px; display:inline-block; position: absolute; bottom: 0px;"
    out += '<div style="width:2px; position:absolute; left: -1px; bottom: 0px; height: 100%; background-color: white;"></div>
        <div style="width:2px; position:absolute; right: -1px; bottom: 0px; height: 100%; background-color: white;"></div>
        <div style="width:100%; position:absolute; top: -1px; height: 2px; left: 0px; background-color: white;"></div>
        <div style="width:100%; position:absolute; bottom: -1px; left: 0px; height: 2px; background-color: white;"></div>'.html_safe
    return out.html_safe
  end

  def icon_overlay_thousand_hack(this_icon, height=48, width=nil, spacing=2)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = ''
    for i in 0..3
      out += image_tag this_icon, :class => 'picto-cell-icon', :style => "height:#{height}px; width: #{width}px; position: absolute; top: #{(i * height) + (i * spacing)}px; border-top: solid #ffffff #{spacing}px;"
    end
    return out.html_safe
  end

  def icon_overlay_thousand(this_icon, height=48, width=nil, spacing=2)
    css_width = width.blank? ? '' : "width: #{width}px; "
    out = "<div class=\"images\" style=\"height: #{height}px; position: absolute; bottom: 0px;\">"
    for i in 1..4
      out += content_tag 'div', ' ', :class => 'thousand picto-cell-icon', :style => "background:url(#{this_icon});  background-size: cover; -ms-behavior: url(/assets/backgroundsize.min.htc); width: #{width}px; border-top: solid #ffffff #{spacing}px;"
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
