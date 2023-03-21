namespace DongHoNam.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class WatchDB : DbContext
    {
        public WatchDB()
            : base("name=WatchDB")
        {
        }

        public virtual DbSet<CTDONHANG> CTDONHANGs { get; set; }
       
        public virtual DbSet<DONHANG> DONHANGs { get; set; }
        public virtual DbSet<KHACHHANG> KHACHHANGs { get; set; }
        public virtual DbSet<LOAI> LOAIs { get; set; }
        public virtual DbSet<SANPHAM> SANPHAMs { get; set; }
        public virtual DbSet<THUONGHIEU> THUONGHIEUx { get; set; }
        public virtual DbSet<UAD> UADs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DONHANG>()
                .HasMany(e => e.CTDONHANGs)
                .WithRequired(e => e.DONHANG)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<KHACHHANG>()
                .Property(e => e.SDT)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<KHACHHANG>()
                .Property(e => e.EMAIL)
                .IsFixedLength()
                .IsUnicode(false);

            modelBuilder.Entity<KHACHHANG>()
                .Property(e => e.PASSWORD)
                .IsUnicode(false);

            modelBuilder.Entity<KHACHHANG>()
                .HasMany(e => e.DONHANGs)
                .WithRequired(e => e.KHACHHANG)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<LOAI>()
                .HasMany(e => e.SANPHAMs)
                .WithRequired(e => e.LOAI)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<SANPHAM>()
                .HasMany(e => e.CTDONHANGs)
                .WithRequired(e => e.SANPHAM)
                .WillCascadeOnDelete(false);

           

            modelBuilder.Entity<THUONGHIEU>()
                .HasMany(e => e.SANPHAMs)
                .WithRequired(e => e.THUONGHIEU)
                .WillCascadeOnDelete(false);
        }
    }
}
