module ApplicationHelper
  
  @@overlay_opacity = 1.0
  
  def link_to_active_if_current(text, path, options={})
    link_to_unless_current(text, path, options) do
		  link_to(text, path, options.merge(:class => 'active'))
		end
  end
  
  def icon(icon, color, height=45, width=nil)
    icon_file = icon.split('/').last
    css_width = width.blank? ? '' : "width: #{width}px; "
    url = case Rails.env
      when 'production'
        'http://www.iconarray.com'
      else 'staging'
        'http://staging.iconarray.com'
    end
    # out = image_tag icon, :style => "height:#{height}px; background-color: #{color}", :class => 'overlay'
    out = "<img src='#{url}/images/icons/#{icon_file}' style='#{css_width}height:#{height}px; background-color: #{color}' class='overlay' />"
		return out.html_safe
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
  
end
