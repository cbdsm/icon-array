require 'test_helper'

class RisksControllerTest < ActionController::TestCase
  setup do
    @risk = risks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:risks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create risk" do
    assert_difference('Risk.count') do
      post :create, risk: @risk.attributes
    end

    assert_redirected_to risk_path(assigns(:risk))
  end

  test "should show risk" do
    get :show, id: @risk
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @risk
    assert_response :success
  end

  test "should update risk" do
    put :update, id: @risk, risk: @risk.attributes
    assert_redirected_to risk_path(assigns(:risk))
  end

  test "should destroy risk" do
    assert_difference('Risk.count', -1) do
      delete :destroy, id: @risk
    end

    assert_redirected_to risks_path
  end
end
