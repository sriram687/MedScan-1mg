import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { orderAPI } from '../services/orderApi';
import { Pill, Calendar, Package, ShieldAlert, ShieldCheck, TrendingUp, Clock, Eye, CheckCircle, Truck, Home, MapPin } from 'lucide-react';

type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  timestamp: Date;
  completed: boolean;
}

interface MedicineOrder {
  id: string;
  orderNumber: string;
  medicineName: string;
  manufacturer: string;
  image: string;
  quantity: number;
  price: string;
  prescriptionRequired: boolean;
  orderDate: Date;
  currentStatus: OrderStatus;
  trackingSteps: OrderTrackingStep[];
  estimatedDelivery: Date;
}

interface DeliveredMedicine {
  medicine: {
    _id: string;
    name: string;
    price: string;
    image_url: string;
    composition: string;
    manufacturer: string;
    prescriptionRequired: boolean;
    uses: string;
    side_effects: string;
  };
  quantity: number;
  price: string;
  prescriptionRequired: boolean;
  orderNumber: string;
  orderDate: string;
  deliveredDate: string;
  doctorName?: string;
}

interface MedicineStats {
  totalOrders: number;
  uniqueMedicines: number;
  totalQuantity: number;
  prescriptionMedicines: number;
}

const MyMedicinesPage: React.FC = () => {
  // Mock data - in production, this would come from the backend
  const mockOrders: MedicineOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-2026-001',
      medicineName: 'Aspirin 500mg',
      manufacturer: 'Cipla Ltd',
      image: 'https://via.placeholder.com/150?text=Aspirin',
      quantity: 2,
      price: '₹150',
      prescriptionRequired: false,
      orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      currentStatus: 'delivered' as OrderStatus,
      estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      trackingSteps: [
        { status: 'confirmed', label: 'Order Confirmed', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'processing', label: 'Processing', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'shipped', label: 'Shipped', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), completed: true },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-2026-002',
      medicineName: 'Paracetamol 650mg',
      manufacturer: 'GSK India',
      image: 'https://via.placeholder.com/150?text=Paracetamol',
      quantity: 1,
      price: '₹80',
      prescriptionRequired: false,
      orderDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      currentStatus: 'out_for_delivery' as OrderStatus,
      estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      trackingSteps: [
        { status: 'confirmed', label: 'Order Confirmed', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'processing', label: 'Processing', timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'shipped', label: 'Shipped', timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), completed: false },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD-2026-003',
      medicineName: 'Amoxicillin 500mg',
      manufacturer: 'Amoxicillin',
      image: 'https://via.placeholder.com/150?text=Amoxicillin',
      quantity: 3,
      price: '₹200',
      prescriptionRequired: true,
      orderDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      currentStatus: 'shipped' as OrderStatus,
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      trackingSteps: [
        { status: 'confirmed', label: 'Order Confirmed', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'processing', label: 'Processing', timestamp: new Date(Date.now() - 0.8 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'shipped', label: 'Shipped', timestamp: new Date(Date.now() - 0.2 * 24 * 60 * 60 * 1000), completed: true },
        { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: new Date(Date.now() + 1.5 * 24 * 60 * 60 * 1000), completed: false },
        { status: 'delivered', label: 'Delivered', timestamp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false },
      ],
    },
  ];

  const [medicines, setMedicines] = useState<MedicineOrder[]>(mockOrders);
  const [stats, setStats] = useState<MedicineStats>({
    totalOrders: mockOrders.length,
    uniqueMedicines: mockOrders.length,
    totalQuantity: mockOrders.reduce((sum, o) => sum + o.quantity, 0),
    prescriptionMedicines: mockOrders.filter(o => o.prescriptionRequired).length,
  });
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<MedicineOrder | null>(null);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-[#004ac6]" />;
      case 'processing': return <Package className="w-5 h-5 text-[#2563eb]" />;
      case 'shipped': return <Truck className="w-5 h-5 text-[#2563eb]" />;
      case 'out_for_delivery': return <MapPin className="w-5 h-5 text-[#006c49]" />;
      case 'delivered': return <Home className="w-5 h-5 text-[#006c49]" />;
      default: return null;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-[#eff4ff] text-[#004ac6]';
      case 'processing': return 'bg-[#dce9ff] text-[#2563eb]';
      case 'shipped': return 'bg-[#dce9ff] text-[#2563eb]';
      case 'out_for_delivery': return 'bg-[#e0f2e9] text-[#006c49]';
      case 'delivered': return 'bg-[#c0f8d8] text-[#006c49]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
    };
    return labels[status];
  };

  return (
    <div className="landing-font min-h-screen bg-[#f8f9ff] py-12">
      <div className="max-w-7xl mx-auto px-[32px]">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-[#0b1c30] mb-3">My Medicines</h1>
          <p className="text-[18px] leading-[1.6] text-[#434655]">Track your orders, delivery status, and medication history</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card ambient-shadow rounded-[24px] p-8 border border-[rgba(195,198,215,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655] mb-2">Total Orders</p>
                <p className="text-[32px] leading-[1] font-bold text-[#004ac6]">{stats.totalOrders}</p>
              </div>
              <Package className="w-10 h-10 text-[#2563eb] opacity-70" />
            </div>
          </div>

          <div className="glass-card ambient-shadow rounded-[24px] p-8 border border-[rgba(195,198,215,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655] mb-2">Unique Medicines</p>
                <p className="text-[32px] leading-[1] font-bold text-[#006c49]">{stats.uniqueMedicines}</p>
              </div>
              <Pill className="w-10 h-10 text-[#006c49] opacity-70" />
            </div>
          </div>

          <div className="glass-card ambient-shadow rounded-[24px] p-8 border border-[rgba(195,198,215,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655] mb-2">Total Quantity</p>
                <p className="text-[32px] leading-[1] font-bold text-[#3e3fcc]">{stats.totalQuantity}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-[#3e3fcc] opacity-70" />
            </div>
          </div>

          <div className="glass-card ambient-shadow rounded-[24px] p-8 border border-[rgba(195,198,215,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] leading-[1] tracking-[0.05em] font-semibold text-[#434655] mb-2">Prescription Meds</p>
                <p className="text-[32px] leading-[1] font-bold text-[#93000a]">{stats.prescriptionMedicines}</p>
              </div>
              <ShieldAlert className="w-10 h-10 text-[#93000a] opacity-70" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        {medicines.length === 0 ? (
          <div className="text-center py-20">
            <Pill className="w-20 h-20 text-[#c3c6d7] mx-auto mb-6" />
            <h2 className="text-[30px] leading-[1.2] font-bold text-[#0b1c30] mb-2">No medicines tracked yet</h2>
            <p className="text-[16px] leading-[1.5] text-[#434655] mb-8">Your medicine orders will appear here</p>
            <Link href="/store">
              <span className="inline-block bg-[#2563eb] text-[#eeefff] px-8 py-4 rounded-full font-bold hover:-translate-y-0.5 transition-transform ambient-shadow cursor-pointer">
                Browse Medicines
              </span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {medicines.map((order) => (
              <div key={order.id} className="glass-card ambient-shadow rounded-[24px] border border-[rgba(195,198,215,0.35)] overflow-hidden">
                <div className="p-8">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-[rgba(195,198,215,0.35)]">
                    <div className="flex gap-6">
                      {/* Medicine Image */}
                      <div className="w-20 h-20 rounded-2xl bg-[#eff4ff] flex items-center justify-center flex-shrink-0">
                        <Pill className="w-10 h-10 text-[#2563eb]" />
                      </div>
                      
                      {/* Medicine Info */}
                      <div className="flex-1">
                        <h3 className="text-[20px] leading-[1.3] font-bold text-[#0b1c30] mb-2">{order.medicineName}</h3>
                        <p className="text-[14px] text-[#434655] mb-3">{order.manufacturer}</p>
                        <div className="flex items-center gap-3">
                          {order.prescriptionRequired ? (
                            <span className="inline-flex items-center gap-1 bg-[#ffdad6] text-[#93000a] px-3 py-1.5 rounded-full text-[12px] font-semibold">
                              <ShieldAlert className="w-4 h-4" />
                              Prescription
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-[#c0f8d8] text-[#006c49] px-3 py-1.5 rounded-full text-[12px] font-semibold">
                              <ShieldCheck className="w-4 h-4" />
                              OTC
                            </span>
                          )}
                          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold ${getStatusColor(order.currentStatus)}`}>
                            {getStatusIcon(order.currentStatus)}
                            {formatStatusLabel(order.currentStatus)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price & Date */}
                    <div className="text-right">
                      <p className="text-[24px] leading-[1] font-bold text-[#004ac6] mb-3">{order.price}</p>
                      <p className="text-[13px] text-[#434655] opacity-70">Order #{order.orderNumber}</p>
                      <p className="text-[13px] text-[#434655] opacity-70">{order.orderDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-6">
                      <Clock className="w-4 h-4 text-[#434655]" />
                      <p className="text-[14px] font-semibold text-[#0b1c30]">Order Progress</p>
                    </div>
                    
                    <div className="relative">
                      <div className="flex justify-between">
                        {order.trackingSteps.map((step, index) => (
                          <div key={index} className="flex flex-col items-center flex-1">
                            {/* Timeline line */}
                            {index < order.trackingSteps.length - 1 && (
                              <div className={`absolute top-6 left-1/2 right-1/2 h-1 ${step.completed ? 'bg-[#006c49]' : 'bg-[#c3c6d7]'}`} />
                            )}
                            
                            {/* Circle */}
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step.completed ? 'bg-[#006c49]' : 'bg-[#e5eeff]'}`}>
                              {step.completed ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-[#2563eb]" />
                              )}
                            </div>
                            
                            {/* Label */}
                            <p className="text-[12px] font-semibold text-[#0b1c30] text-center">{step.label}</p>
                            {step.completed && (
                              <p className="text-[10px] text-[#434655] opacity-60">{step.timestamp.toLocaleDateString()}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* est Delivery */}
                  <div className="bg-[#eff4ff] rounded-2xl p-4 mb-6">
                    <p className="text-[12px] text-[#434655] opacity-70 mb-1">Estimated Delivery</p>
                    <p className="text-[16px] font-bold text-[#004ac6]">{order.estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex-1 bg-[#2563eb] text-[#eeefff] py-3 px-6 rounded-full font-bold hover:-translate-y-0.5 transition-transform text-[14px]"
                    >
                      View History
                    </button>
                    <Link href={`/medicine/${order.id}`}>
                      <span className="block flex-1 bg-[#dce9ff] text-[#004ac6] py-3 px-6 rounded-full font-bold hover:bg-[#e5eeff] transition-colors text-[14px] text-center cursor-pointer">
                        Reorder
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order History Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-8 border-b border-[rgba(195,198,215,0.35)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-[24px] leading-[1.2] font-bold text-[#0b1c30]">Order Details</h2>
                    <p className="text-[14px] text-[#434655] mt-1 opacity-70">Order #{selectedOrder.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    aria-label="Close order details"
                    className="text-[#737686] hover:text-[#0b1c30] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Main Info */}
                <div className="bg-[#f8f9ff] rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-[12px] text-[#434655] opacity-70 mb-1">Quantity</p>
                      <p className="text-[18px] font-bold text-[#0b1c30]">{selectedOrder.quantity}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#434655] opacity-70 mb-1">Price</p>
                      <p className="text-[18px] font-bold text-[#004ac6]">{selectedOrder.price}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#434655] opacity-70 mb-1">Status</p>
                      <p className={`text-[14px] font-bold ${getStatusColor(selectedOrder.currentStatus)}`}>{formatStatusLabel(selectedOrder.currentStatus)}</p>
                    </div>
                    <div>
                      <p className="text-[12px] text-[#434655] opacity-70 mb-1">Type</p>
                      <p className="text-[14px] font-bold text-[#0b1c30]">{selectedOrder.prescriptionRequired ? 'Rx' : 'OTC'}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-[16px] font-bold text-[#0b1c30] mb-4">Delivery Timeline</h3>
                  <div className="space-y-3">
                    {selectedOrder.trackingSteps.map((step, index) => (
                      <div key={index} className={`p-4 rounded-2xl border ${step.completed ? 'bg-[#c0f8d8] border-[#006c49]' : 'bg-[#f8f9ff] border-[rgba(195,198,215,0.35)]'}`}>
                        <div className="flex items-start gap-3">
                          {step.completed ? (
                            <CheckCircle className="w-5 h-5 text-[#006c49] flex-shrink-0 mt-0.5" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-[#2563eb] flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`text-[14px] font-semibold ${step.completed ? 'text-[#006c49]' : 'text-[#0b1c30]'}`}>{step.label}</p>
                            <p className="text-[12px] text-[#434655] opacity-70">{step.timestamp.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMedicinesPage;
