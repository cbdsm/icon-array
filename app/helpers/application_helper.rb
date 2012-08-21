module ApplicationHelper
  
  @@overlay_opacity = 1.0
  
  def link_to_active_if_current(text, path, options={})
    link_to_unless_current(text, path, options) do
		  link_to(text, path, options.merge(:class => 'active'))
		end
  end
  
  def icon(icon, color, height=45)
    rgb = hex2rgb(color)
    out = "<div class=\"tint\" style=\"height: #{height}px; \">"
		out += image_tag icon, :style => "height:#{height}px;"
		out += image_tag icon.gsub('icons', 'icon_overlays'), :style => "height:#{height}px; background-color: rgba(#{rgb[0]}, #{rgb[1]}, #{rgb[2]}, #{@@overlay_opacity});", :class => 'overlay'
		out += "</div>"
		return out.html_safe
  end
  
  def box(color, height=45)
    width = (height / 1.8).round
    return "<div class='icon-box' style='width:#{width}px; height: #{height}px; background-color: #{color};'></div>".html_safe
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
