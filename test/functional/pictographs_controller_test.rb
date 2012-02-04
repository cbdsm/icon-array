require 'test_helper'

class PictographsControllerTest < ActionController::TestCase
  setup do
    @pictograph = pictographs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:pictographs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create pictograph" do
    assert_difference('Pictograph.count') do
      post :create, pictograph: @pictograph.attributes
    end

    assert_redirected_to pictograph_path(assigns(:pictograph))
  end

  test "should show pictograph" do
    get :show, id: @pictograph
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @pictograph
    assert_response :success
  end

  test "should update pictograph" do
    put :update, id: @pictograph, pictograph: @pictograph.attributes
    assert_redirected_to pictograph_path(assigns(:pictograph))
  end

  test "should destroy pictograph" do
    assert_difference('Pictograph.count', -1) do
      delete :destroy, id: @pictograph
    end

    assert_redirected_to pictographs_path
  end
end
