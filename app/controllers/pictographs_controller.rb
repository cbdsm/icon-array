class PictographsController < ApplicationController
  before_filter :set_params, :only => [:new, :view, :embed]
  
  # GET /pictographs
  # GET /pictographs.json
  def index
    @pictographs = Pictograph.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pictographs }
    end
  end

  # GET /pictographs/1
  # GET /pictographs/1.json
  def show
    if params[:id]
      @pictograph = Pictograph.find(params[:id])
    else
      @pictograph = Pictograph.new(@p)
    end
    
    # risk numbers
    # for now, we're just doing ints
    @risk = @pictograph.risk.to_i || 0
    @incremental_risk = @pictograph.incremental_risk.to_i || 0
    @reduced_risk = @pictograph.reduced_risk.to_i || 0
    @off = 100 - @risk - @incremental_risk - @reduced_risk

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @pictograph }
    end
  end

  # GET /pictographs/new
  # GET /pictographs/new.json
  def new
    @pictograph = Pictograph.new(@p)
    logger.info @pictograph.inspect

    respond_to do |format|
      format.html # new.html.erb 
      format.xml  { render :xml => @pictograph }
      format.json { render json: @pictograph }
    end
  end

  # GET /pictographs/1/edit
  def edit
    @pictograph = Pictograph.find(params[:id])
  end

  # POST /pictographs
  # POST /pictographs.json
  def create
    if params[:commit] == "export for print"
      redirect_to view_pictographs_path(params[:pictograph].merge(:format => :tif))
    elsif params[:commit] == "export for web"
     redirect_to view_pictographs_path(params[:pictograph].merge(:format => :jpg))
    elsif params[:commit] == "preview"
      redirect_to view_pictographs_path(params[:pictograph])
    # NOTE: at this point, we never actually save a picto
    else
      @pictograph = Pictograph.new(params[:pictograph])

      respond_to do |format|
        if @pictograph.save
          format.html { redirect_to @pictograph, notice: 'Pictograph was successfully created.' }
          format.json { render json: @pictograph, status: :created, location: @pictograph }
        else
          format.html { render action: "new" }
          format.json { render json: @pictograph.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PUT /pictographs/1
  # PUT /pictographs/1.json
  def update
    if params[:commit] == "Preview"
      redirect_to generate_pictographs_path(params[:pictograph])
    else
      @pictograph = Pictograph.find(params[:id])

      respond_to do |format|
        if @pictograph.update_attributes(params[:pictograph])
          format.html { redirect_to @pictograph, notice: 'Pictograph was successfully updated.' }
          format.json { head :no_content }
        else
          format.html { render action: "edit" }
          format.json { render json: @pictograph.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /pictographs/1
  # DELETE /pictographs/1.json
  def destroy
    @pictograph = Pictograph.find(params[:id])
    @pictograph.destroy

    respond_to do |format|
      format.html { redirect_to pictographs_url }
      format.json { head :no_content }
    end
  end
  
  # GET /pictographs/view
  # GET /pictographs/view.json
  def view
    @pictograph = Pictograph.new(@p)
    
    respond_to do |format|
      format.html { 
        @url = request.url
        render 'show'
      }
      format.json { render json: @pictograph }
      format.xml  { render :xml => @pictograph }   

      format.jpg {
        @kit = IMGKit.new(render_to_string('show', :layout => 'embed'), 'crop-w' => @pictograph.export_width)
        @kit.stylesheets << Rails.root.to_s + '/app/assets/stylesheets/application.css'
        image = @kit.to_jpg
        send_data(image, :type => "image/jpeg", :disposition => 'attachment', :filename => "icon-array_#{Time.now.strftime('%d-%m-%Y')}.jpg")
      }
      format.tif {
        @pictograph.cell_width = @pictograph.cell_width * 5
        @pictograph.cell_height = @pictograph.cell_height * 5
        @pictograph.cell_spacing = @pictograph.cell_spacing * 5
        @pictograph.axis_font_size = @pictograph.axis_font_size * 5
        @pictograph.title_font_size = @pictograph.title_font_size * 5
        @pictograph.legend_font_size = @pictograph.legend_font_size * 5
        
        # We have to do all of this with files, since stdin/stdout don't seem to work with wkhtmltoimage
        inpath = "#{Rails.root.to_s}/tmp/tiff_#{Time.now.to_i}.html"
        outpath = "#{Rails.root.to_s}/tmp/tiff_#{Time.now.to_i}.tiff"
        infile = File.open(inpath,'w:ASCII-8BIT') {|file| file << render_to_string('show.jpg.erb')}
        
        bin = ENV['RACK_ENV'] == 'production' ? Rails.root.join('bin', 'wkhtmltoimage-amd64').to_s : 'wkhtmltoimage'       
                
        `#{bin} --format tiff #{inpath} #{outpath}`

        send_file outpath, :type => 'image/tiff', :disposition => 'attachment', :filename => "icon-array_#{Time.now.strftime('%d-%m-%Y')}.tiff", :stream => false
        File.unlink(inpath)
        File.unlink(outpath)
      }
      
    end
  end
  
  # GET /pictographs/embed
  # GET /pictographs/embed.json
  def embed
    @pictograph = Pictograph.new(@p)
    
    respond_to do |format|
      format.html { render 'show', :layout => 'embed' }
      format.json { render json: @pictograph }
      format.xml  { render :xml => @pictograph }    
    end
  end
  
  private
    def set_params
      if !params[:pictograph].blank?
        @p = params[:pictograph]
      else
        @p = params.clone
        @p.delete(:format)
        @p.delete(:controller)
        @p.delete(:action)
        @p.delete(:advanced)
      end
      
      if !params[:advanced].blank? and params[:advanced] == true
        @advanced = true 
      else
        @advanced = false
      end

      if @p[:risks_attributes].nil? or @p[:risks_attributes].empty?
        @p[:risks_attributes] = {0 => {:hex => '#DCDCDC', :population => 'out of 100 people', :description => "out of 100 people don't exhibit this property"}, 1 => {:hex => '#0000FF', :value => 32, :population => 'out of 100 people', :description => 'out of 100 people exhibit this property'}}
      end
      
      @p.delete(:title) if @p[:title].blank?
    end
  
end
