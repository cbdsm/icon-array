class PictographsController < ApplicationController
  before_filter :set_params, :only => [:new, :generate]
  
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
    if params[:commit] == "Preview"
      redirect_to generate_pictographs_path(params[:pictograph])
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
  
  # GET /pictographs/generate
  # GET /pictographs/generate.json
  def generate
    @pictograph = Pictograph.new(@p)
    
    respond_to do |format|
      format.html { render 'show' }
      format.json { render json: @pictograph }
      format.xml  { render :xml => @pictograph }    
    end
  end
  
  # GET /pictographs/generate
  # GET /pictographs/generate.json
  def embed
    @pictograph = Pictograph.new(@p)
    
    respond_to do |format|
      format.html { render 'show' }
      format.json { render json: @pictograph }
      format.xml  { render :xml => @pictograph }    
    end
  end
  
  private
    def set_params
      @p = params
      @p.delete(:controller)
      @p.delete(:action)
      @p[:risk] ||= 50

      if @p[:risks_attributes].nil? or @p[:risks_attributes].empty?
        @p[:risks_attributes] = {0 => {:hex => '#DCDCDC'}, 1 => {:hex => '#0000FF', :value => 32}}
      end
    end
  
end
