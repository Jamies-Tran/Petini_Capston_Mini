package com.capstone.mini.petini.security.role_config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.google.common.collect.Sets;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public enum Role {
    PASSENGER(Sets.newHashSet(Permission.BOOKING_CREATE, Permission.BOOKING_MODIFY, Permission.BOOKING_REMOVE,
            Permission.BOOKING_CANCEL, Permission.PROMOTION_ADD, Permission.PROMOTION_MODIFY,
            Permission.PROMOTION_VIEW)),
    LANDLORD(Sets.newHashSet(Permission.HOMESTAY_CREATE, Permission.HOMESTAY_MODIFY, Permission.HOMESTAY_REMOVE,
            Permission.BOOKING_CANCEL, Permission.PROMOTION_CREATE, Permission.PROMOTION_USAGE,
            Permission.PROMOTION_VIEW)),
    ADMIN(Sets.newHashSet(Permission.HOMESTAY_BAN, Permission.PROMOTION_CREATE, Permission.PROMOTION_MODIFY,
            Permission.PROMOTION_REMOVE, Permission.PROMOTION_VIEW, Permission.ADMIN_CREATE));

    @Getter
    @Setter
    private Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
        simpleGrantedAuthorities.add(new SimpleGrantedAuthority("ROLE_".concat(this.name())));
        this.permissions.stream().forEach(p -> {
            simpleGrantedAuthorities.add(new SimpleGrantedAuthority(p.getPermission()));
        });
        return simpleGrantedAuthorities;
    }
}
