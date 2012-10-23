class ApplicationController < ActionController::Base
  protect_from_forgery
  
  helper_method :advanced
  attr_reader   :advanced
  
  private
    def set_params
      if params[:reset] or (request.env["HTTP_REFERER"].blank? and request.fullpath['?'].nil?)
        session.delete(:pictograph)
        @p = Hash.new
      elsif !params[:pictograph].blank?
        if session[:pictograph]
          session[:pictograph].deep_merge!(params[:pictograph])
          # session[:pictograph][:title] = params[:pictograph][:title]
          # session[:pictograph][:risks_attributes]['0'].merge!(params[:pictograph][:risks_attributes]['0'])
          # session[:pictograph][:risks_attributes]['1'].merge!(params[:pictograph][:risks_attributes]['1'])
          @p = session[:pictograph]
        else
          @p = params[:pictograph]
        end
        
        @p[:risks_attributes].each do |i, risk|
          @p[:risks_attributes].delete(i) if risk['_destroy'] == '1' or risk['_destroy'] == 1
        end
        session[:pictograph] = @p
      elsif !%w[www.iconarray.com staging.iconarray.com localhost iconarray-staging.herokuapp.com].include? URI.parse(request.env["HTTP_REFERER"]).host
        @p = params
        @advanced = true
        session[:advanced] = @advanced
        @p.delete :action
        @p.delete :controller
        @p.delete :advanced
        @p.delete :format
        @p.delete :tab
        session[:pictograph] = @p
      else
        @p = session[:pictograph] || {}
        # TODO: we need to decide if we'll allow any sort of api request
        # @p = params.clone
        # @p.delete(:format)
        # @p.delete(:controller)
        # @p.delete(:action)
        # @p.delete(:advanced)
      end
      cells = (!@p[:rows].blank? and !@p[:cols].blank?) ? (@p[:rows].to_i * @p[:cols].to_i) : 100
      
      if @p[:risks_attributes].nil? or @p[:risks_attributes].empty?
        @p[:risks_attributes] = {'0' => {:hex => '#DCDCDC', :population => "out of #{cells} people", :description => "out of #{cells} people don't exhibit this property"}, '1' => {:hex => '#0000FF', :value => 32, :population => "out of #{cells} people", :description => "out of #{cells} people exhibit this property"}}
      end
      
      if params[:action] == 'new' and !request.format.js?
        if !params[:advanced].blank? and params[:advanced] == true
          @advanced = true 
        else
          @advanced = false
        end
        session[:advanced] = @advanced
      else
        if !session[:advanced].blank? and session[:advanced] == true
          @advanced = true 
        else
          @advanced = false
        end
      end
      
      # pare out some attributes if this is basic mode
      unless @advanced == true
        @p = {:title => @p[:title], :risks_attributes => {0 => @p[:risks_attributes]['0'], 1 => @p[:risks_attributes]['1']}}
      end
            
      @p.delete(:title) if @p[:title].blank?
    end
    
    def advanced
      if params[:advanced] == true or params[:advanced] == 'true'
        @advanced = true
      end
      return @advanced if defined?(@advanced)
      if !session[:advanced].blank?
        @advanced = session[:advanced]
      else
        @advanced = false
      end
    end
    
end
