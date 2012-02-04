class PictographsController < ApplicationController
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
    @pictograph = Pictograph.find(params[:id])
    
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
    @pictograph = Pictograph.new

    respond_to do |format|
      format.html # new.html.erb
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

  # PUT /pictographs/1
  # PUT /pictographs/1.json
  def update
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
end
